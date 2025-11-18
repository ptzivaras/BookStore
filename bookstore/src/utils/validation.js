export function validateBook(b) {
  const errors = {};

  // Title: 10–120 chars; allow @ # & * !
  const titleOk = /^([@#&*!A-Za-z0-9].){9,119}$/u.test(b.title || "");
  if (!titleOk) errors.title = "Title must be 10–120 chars and may include @#&*!";

  // Description: ≤512 chars; must start with uppercase
  const desc = b.description || "";
  if (!(desc.length <= 512 && /^[A-Z]/.test(desc)))
    errors.description = "Description ≤ 512 chars and start with uppercase";

  if (b.categories && b.categories.length > 4) errors.categories = "Max 4 categories";
  if (b.authors && b.authors.length > 3) errors.authors = "Max 3 authors";

  const pub = b.publisher || "";
  if (!(pub.length >= 5 && pub.length <= 60)) errors.publisher = "Publisher 5–60 chars";

  const year = String(b.year || "").trim();
  if (!/^\d{4}$/.test(year)) errors.year = "Year must be 4 digits";

  const pages = Number(b.pages ?? 0);
  if (!(pages > 0 && pages <= 9999)) errors.pages = "Pages up to 9999";

  const isbn10 = String(b.isbn10 || "").trim();
  const isbn13 = String(b.isbn13 || "").trim();
  if (!/^\d{10}$/.test(isbn10)) errors.isbn10 = "ISBN-10: 10 digits";
  if (!/^\d{13}$/.test(isbn13)) errors.isbn13 = "ISBN-13: 13 digits";

  return errors;
}
