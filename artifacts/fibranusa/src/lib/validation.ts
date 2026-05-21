const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ValidationResult = {
  valid: boolean;
  error: string;
};

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function sanitizeEngravingText(text: string): string {
  return text
    .replace(/[<>"'`]/g, "")
    .replace(/\s+/g, " ")
    .trimStart()
    .slice(0, 28);
}

export function validateContactForm(fields: {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
}): ValidationResult {
  if (!fields.name.trim()) {
    return { valid: false, error: "Name is required." };
  }
  if (!fields.email.trim()) {
    return { valid: false, error: "Email is required." };
  }
  if (!isValidEmail(fields.email)) {
    return { valid: false, error: "Please enter a valid email address." };
  }
  if (!fields.message.trim()) {
    return { valid: false, error: "Message is required." };
  }
  return { valid: true, error: "" };
}

export function validateQuoteRequest(email: string): ValidationResult {
  if (!email.trim()) {
    return { valid: false, error: "Email is required to request a quote." };
  }
  if (!isValidEmail(email)) {
    return { valid: false, error: "Please enter a valid email address." };
  }
  return { valid: true, error: "" };
}

export function validatePreorderSignup(email: string): ValidationResult {
  if (!email.trim()) {
    return { valid: false, error: "Email is required." };
  }
  if (!isValidEmail(email)) {
    return { valid: false, error: "Please enter a valid email address." };
  }
  return { valid: true, error: "" };
}
