// 从一篇文章/代码中取出符合正则规则的键
exports.extraWordsByContext = (context, sentenceReg, wordsReg, wordsRegIndex) => {
    const extraSentencesByContext = (context, sentenceReg) => {
        return context.match(sentenceReg)
    }

    const extraWordsBySentence = (sentences, wordsReg, wordsRegIndex) => {
        const words = [];
        console.log(sentences, wordsReg, wordsRegIndex)
        sentences.forEach((sentence) => {
            words.push(sentence.match(wordsReg)[wordsRegIndex]);
        })
        console.log(words)
        return words;
    }

    const sentences = extraSentencesByContext(context, sentenceReg);
    // TODO 如果sentences为null，异常处理
    return extraWordsBySentence(sentences, wordsReg, wordsRegIndex);
}