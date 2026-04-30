import Card from "./Card";

type StepCardProps = {
  description: string;
  step: string;
  title?: string;
};

function StepIcon({ step }: Pick<StepCardProps, "step">) {
  const iconClasses = "h-[18px] w-[18px] stroke-[#2453FF] stroke-[1.7] fill-none";

  if (step === "STEP 01") {
    return (
      <svg aria-hidden="true" className={iconClasses} viewBox="0 0 24 24">
        <path d="M7 4.5h6l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 6 19V6A1.5 1.5 0 0 1 7.5 4.5Z" />
        <path d="M13 4.5V9h4.5" />
      </svg>
    );
  }

  if (step === "STEP 02") {
    return (
      <svg aria-hidden="true" className={iconClasses} viewBox="0 0 24 24">
        <path d="M4.5 12h3l2-5 4.5 10 2.5-5H19.5" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={iconClasses} viewBox="0 0 24 24">
      <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M6.5 18.5a5.5 5.5 0 0 1 11 0" />
    </svg>
  );
}

export default function StepCard({ description, step, title }: StepCardProps) {
  return (
    <Card className="h-full min-h-[205px] rounded-[20px] !border-[rgba(0,0,0,0.83)] !bg-[#FFFFFF] px-[24px] pb-[22px] pt-[26px] shadow-none lg:h-[267.11px] lg:min-h-0 lg:w-[328px]">
      <div className="flex h-full flex-col">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4C80FF]">
          {step}
        </p>

        <div className="mt-[20px] flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border border-[#2453FF] bg-[#B9CCFF]">
          <StepIcon step={step} />
        </div>

        <div className="mt-[46px] space-y-2">
          {title ? <h3 className="text-xl font-semibold tracking-tight text-[#11205f]">{title}</h3> : null}
          <p className="max-w-[220px] text-[14px] font-normal leading-[1.5] text-[#7A7A81] lg:max-w-[220px]">{description}</p>
        </div>
      </div>
    </Card>
  );
}
