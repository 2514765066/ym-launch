//判断文本是否按顺序包含关键词
export const matchKeyword = (text: string | string[], keyword: string) => {
  const texts = Array.isArray(text) ? text : [text];

  //统一大小写并忽略关键词中的单引号
  const normalizedKeyword = keyword.replaceAll("'", '').toLowerCase();

  return texts.some((text) => {
    const normalizedText = text.toLowerCase();
    let searchStartIndex = 0;

    for (const character of normalizedKeyword) {
      const matchedIndex = normalizedText.indexOf(character, searchStartIndex);

      if (matchedIndex === -1) {
        return false;
      }

      searchStartIndex = matchedIndex + character.length;
    }

    return true;
  });
};
