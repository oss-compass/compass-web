import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useThirdTxtSearchQuery } from '@oss-compass/graphql';
import RecommendationSection from '.';

jest.mock('@oss-compass/graphql', () => ({
  useThirdTxtSearchQuery: jest.fn(),
}));

jest.mock('@common/gqlClient', () => ({}));

jest.mock('@modules/os-selection/constant', () => ({
  useLanguagesList: () => [{ id: 'javascript', name: 'JavaScript' }],
}));

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('@common/monumentedStation', () => ({
  TrackingWrapper: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('../SoftwareCard', () => () => null);
jest.mock('../GenReport', () => () => null);

const mockUseThirdTxtSearchQuery =
  useThirdTxtSearchQuery as jest.MockedFunction<typeof useThirdTxtSearchQuery>;

describe('RecommendationSection', () => {
  const refetch = jest.fn();

  beforeEach(() => {
    refetch.mockReset();
    mockUseThirdTxtSearchQuery.mockReturnValue({
      data: undefined,
      isFetching: false,
      refetch,
    } as unknown as ReturnType<typeof useThirdTxtSearchQuery>);
  });

  it('does not request recommendations without a description', () => {
    render(<RecommendationSection />);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'recommendation_section.button',
      })
    );

    expect(refetch).not.toHaveBeenCalled();
    expect(
      screen.getByText('recommendation_section.desc_error')
    ).toBeInTheDocument();
  });

  it('does not request recommendations without a target language', () => {
    render(<RecommendationSection />);

    fireEvent.change(
      screen.getByPlaceholderText('recommendation_section.desc_placeholder'),
      { target: { value: 'A package for parsing data' } }
    );
    fireEvent.click(
      screen.getByRole('button', {
        name: 'recommendation_section.button',
      })
    );

    expect(refetch).not.toHaveBeenCalled();
    expect(
      screen.getByText('recommendation_section.lang_error')
    ).toBeInTheDocument();
  });

  it('requests recommendations once when the form is valid', () => {
    render(<RecommendationSection />);

    fireEvent.change(
      screen.getByPlaceholderText('recommendation_section.desc_placeholder'),
      { target: { value: 'A package for parsing data' } }
    );
    fireEvent.click(screen.getByRole('button', { name: 'JavaScript' }));
    fireEvent.click(
      screen.getByRole('button', {
        name: 'recommendation_section.button',
      })
    );

    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
