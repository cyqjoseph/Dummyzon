import fs from "fs";
import path from "path";

import matter from "gray-matter";

const itemDirectory = path.join(process.cwd(), "browse");

export function getBrowseFiles() {
  return fs.readdirSync(itemDirectory);
}

export function getBrowseItemsData(itemIdentifier) {
  const itemSlug = itemIdentifier.replace(/\.md$/, "");
  const filePath = path.join(itemDirectory, `${itemSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const itemData = {
    slug: itemSlug,
    ...data,
    content,
  };
  return itemData;
}

export function getAllItems() {
  const itemFiles = getBrowseFiles();

  const allItems = itemFiles.map((itemFile) => {
    return getBrowseItemsData(itemFile);
  });

  return allItems;
}
