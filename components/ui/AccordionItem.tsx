type AccordionItemProps = {
  answer: string;
  defaultOpen?: boolean;
  question: string;
};

export default function AccordionItem({
  answer,
  defaultOpen = false,
  question,
}: AccordionItemProps) {
  return (
    <details
      className="group overflow-hidden rounded-[20px] bg-[#020B41] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.09)]"
      open={defaultOpen}
    >
      <summary className="flex min-h-[58px] cursor-pointer list-none items-center justify-between gap-4 px-[18px] py-[12px] text-left">
        <span className="min-w-0 pr-4 text-[14px] font-normal leading-[1.4] text-white">
          {question}
        </span>
        <span className="shrink-0 text-[16px] leading-none text-white/80 transition-transform duration-200 group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="border-t border-white/10 px-[18px] pb-[16px] pt-[12px]">
        <p className="text-[14px] leading-[1.6] text-[#A3A3A8]">{answer}</p>
      </div>
    </details>
  );
}
