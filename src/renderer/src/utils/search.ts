//判断文本是否按顺序包含关键词
export const matchKeyword = (text: string, keyword: string) => {
  //统一大小写并忽略单引号后的待匹配文本
  const normalizedText = text.toLowerCase();
  const normalizedKeyword = keyword.replaceAll("'", '').toLowerCase();
  let searchStartIndex = 0;

  for (const character of normalizedKeyword) {
    const matchedIndex = normalizedText.indexOf(character, searchStartIndex);

    if (matchedIndex === -1) {
      return false;
    }

    searchStartIndex = matchedIndex + character.length;
  }

  return true;
};
