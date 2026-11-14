import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import LabCommentInput from '@modules/lab/model/Analyze/CommentDrawer/CommentInput';
import SandboxCommentInput from '@modules/oh/DataView/HatchingTreatment/Sandbox/EvaluationInfo/MetricDrawer/CommentInput';
import HatchCommentInput from '@modules/oh/DataView/HatchingTreatment/Hatch/EvaluationInfo/MetricDrawer/CommentInput';
import GraduateCommentInput from '@modules/oh/DataView/HatchingTreatment/Graduate/EvaluationInfo/MetricDrawer/CommentInput';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));
jest.mock('@common/hooks/useImagePreview', () => ({
  __esModule: true,
  default: () => ({ ref: jest.fn(), open: jest.fn(), close: jest.fn() }),
}));

describe.each([
  ['Lab', LabCommentInput],
  ['Sandbox', SandboxCommentInput],
  ['Hatch', HatchCommentInput],
  ['Graduate', GraduateCommentInput],
])('%s comment keyboard input', (_name, Component) => {
  it('does not submit or prevent the Enter used to confirm an IME candidate', () => {
    const onSubmit = jest.fn();
    render(<Component loading={false} onSubmit={onSubmit} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '正在输入' } });
    const accepted = fireEvent.keyDown(input, {
      key: 'Enter',
      code: 'Enter',
      isComposing: true,
    });
    expect(onSubmit).not.toHaveBeenCalled();
    expect(accepted).toBe(true);
    expect(input).toHaveValue('正在输入');
  });

  it('handles the legacy IME key code even if isComposing is already false', () => {
    const onSubmit = jest.fn();
    render(<Component loading={false} onSubmit={onSubmit} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '候选词' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', keyCode: 229 });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits a normal Enter after composition has completed', () => {
    const onSubmit = jest.fn();
    render(<Component loading={false} onSubmit={onSubmit} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '完成输入' } });
    expect(fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })).toBe(
      false
    );
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('完成输入', []);
  });

  it('keeps Shift+Enter multiline input and loading protection', () => {
    const onSubmit = jest.fn();
    const { rerender } = render(
      <Component loading={false} onSubmit={onSubmit} />
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'text' } });
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: true });
    expect(input).toHaveValue('text\n');
    expect(onSubmit).not.toHaveBeenCalled();
    rerender(<Component loading onSubmit={onSubmit} />);
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
