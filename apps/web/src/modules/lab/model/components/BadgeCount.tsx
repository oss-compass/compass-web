import cls from 'classnames';

export const BadgeCount = ({
  className,
  count = 0,
}: {
  className?: string;
  count: number;
}) => {
  return (
    <span
      className={cls(
        'bg-primary h-4 min-w-[16px] shrink-0 rounded-full text-center text-xs leading-4 text-white',
        className
      )}
    >
      {count}
    </span>
  );
};

export default BadgeCount;
