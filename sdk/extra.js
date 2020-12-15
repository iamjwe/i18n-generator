// 从一篇文章/代码中取出符合正则规则的键
extraWordsByContext = (context, sentenceReg, wordsReg, wordsRegIndex) => {
    const extraSentencesByContext = (context, sentenceReg) => {
        return context.match(sentenceReg)
    }

    const extraWordsBySentence = (sentences, wordsReg, wordsRegIndex) => {
        const words = [];
        if (sentences !== null) {
            console.log(sentences)
            sentences.forEach((sentence) => {
                if (sentence.match(wordsReg) !== null) {
                    words.push(sentence.match(wordsReg)[wordsRegIndex]);
                }
            })
        }
        return words;
    }

    const sentences = extraSentencesByContext(context, sentenceReg);
    // TODO 如果sentences为null，异常处理
    return extraWordsBySentence(sentences, wordsReg, wordsRegIndex);
}

module.exports = { extraWordsByContext }