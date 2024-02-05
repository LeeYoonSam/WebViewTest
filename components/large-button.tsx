"use client";

import { Button } from "./ui/button";

interface LargeButtonProps {
  title: string;
  onClickAction: () => void;
}
const LargeButton = ({
  title,
  onClickAction
}: LargeButtonProps) => {
  return (
    <Button
        onClick={onClickAction}
        size="lg"
        variant="outline"
        type="button"
        className="text-lg"
      >
        {title}
      </Button>
  )
}

export default LargeButton;