import { Icons } from "@/components/common/icons";

const MESSAGE = "Hi Salahudin, I found your portfolio and would like to talk.";

export function WhatsAppButton() {
  // International format, digits only, e.g. 923001234567
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(
    /\D/g,
    ""
  );
  if (!number) return null;

  return (
    <a
      href={`https://wa.me/${number}?text=${encodeURIComponent(MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <Icons.whatsapp className="h-7 w-7" />
    </a>
  );
}
