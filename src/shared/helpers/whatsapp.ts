type CreateWhatsappUrlParams = {
  phone: string;
  message: string;
};

export function createWhatsappUrl({
  phone,
  message,
}: CreateWhatsappUrlParams): string {
  const sanitizedPhone = phone.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${sanitizedPhone}?text=${encodedMessage}`;
}
