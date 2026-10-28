import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import LabCommentInput from '@modules/lab/model/Analyze/CommentDrawer/CommentInput';
import SandboxCommentInput from '@modules/oh/DataView/HatchingTreatment/Sandbox/EvaluationInfo/MetricDrawer/CommentInput';
import HatchCommentInput from '@modules/oh/DataView/HatchingTreatment/Hatch/EvaluationInfo/MetricDrawer/CommentInput';
import GraduateCommentInput from '@modules/oh/DataView/HatchingTreatment/Graduate/EvaluationInfo/MetricDrawer/CommentInput';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('@common/hooks/useImagePreview', () => ({
  __esModule: true,
  default: () => ({ ref: jest.fn(), open: jest.fn(), close: jest.fn() }),
}));

describe.each([
  { name: 'Lab', Component: LabCommentInput },
  { name: 'Sandbox', Component: SandboxCommentInput },
  { name: 'Hatch', Component: HatchCommentInput },
  { name: 'Graduate', Component: GraduateCommentInput },
])('$name comment newlines', ({ Component }) => {
  describe.each([
    { name: 'Shift+Enter', modifiers: { shiftKey: true } },
    { name: 'Ctrl+Enter', modifiers: { ctrlKey: true } },
  ])('$name', ({ modifiers }) => {
    it.each([
      { position: 'start', start: 0, end: 0, expected: '\nabcdef' },
      { position: 'middle', start: 3, end: 3, expected: 'abc\ndef' },
      { position: 'selection', start: 2, end: 4, expected: 'ab\nef' },
      { position: 'end', start: 6, end: 6, expected: 'abcdef\n' },
    ])('inserts a newline at the $position', ({ start, end, expected }) => {
      const onSubmit = jest.fn();
      render(<Component loading={false} onSubmit={onSubmit} />);
      const input = screen.getByRole('textbox') as HTMLTextAreaElement;
      fireEvent.change(input, { target: { value: 'abcdef' } });
      input.focus();
      input.setSelectionRange(start, end);

      const accepted = fireEvent.keyDown(input, {
        key: 'Enter',
        code: 'Enter',
        ...modifiers,
      });

      expect(input.value).toBe(expected);
      expect(input.selectionStart).toBe(start + 1);
      expect(input.selectionEnd).toBe(start + 1);
      expect(onSubmit).not.toHaveBeenCalled();
      expect(accepted).toBe(false);
    });
  });

  it('continues submitting plain Enter', () => {
    const onSubmit = jest.fn();
    render(<Component loading={false} onSubmit={onSubmit} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'abcdef' } });

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('abcdef', []);
  });

  it('does not insert a newline or submit while loading', () => {
    const onSubmit = jest.fn();
    render(<Component loading onSubmit={onSubmit} />);
    const input = screen.getByRole('textbox') as HTMLTextAreaElement;
    fireEvent.change(input, { target: { value: 'abcdef' } });
    input.setSelectionRange(2, 2);

    fireEvent.keyDown(input, { key: 'Enter', shiftKey: true });
    fireEvent.keyDown(input, { key: 'Enter', ctrlKey: true });

    expect(input.value).toBe('abcdef');
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
