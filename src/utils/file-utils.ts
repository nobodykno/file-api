import path from "path";

/**
 * Returns a safe filename.
 */
const sanitizeFileName = (
  originalName: string
): string => {
  const extension = path.extname(originalName);

  const name = path.basename(
    originalName,
    extension
  );

  return (
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") +
    extension.toLowerCase()
  );
};

export default sanitizeFileName;