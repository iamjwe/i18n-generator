// 从一篇文章/代码中取出所有符合规则的句子 /${reg}/g
const extraSentencesByContext = (context, sentenceReg) => {
    return context.match(sentenceReg)
}

// 从句子中取出一个符合规则的键
const extraWordsBySentence = (sentence, wordsReg, wordsRegIndex) => {
    let words;
    if (sentence.match(wordsReg) !== null) {
        words = sentence.match(wordsReg)[wordsRegIndex];
    } else {
        words = '_';
    }
    return words;
}

module.exports = { extraSentencesByContext, extraWordsBySentence }