import natural from 'natural';

export const calculatePercentage = (sentences) => {
    const tokenizer = new natural.WordTokenizer();
    let nouns = ['NN', 'NNS', 'NNP', 'NNPS'];
    let pronouns = ['PRP', 'PRP$', 'WP', 'WP$'];
    let adjectives = ['JJ', 'JJR', 'JJS'];
    let adverbs = ['RB', 'RBR', 'RBS'];
    let nounCount = 0;
    let pronounCount = 0;
    let adjectiveCount = 0;
    let adverbCount = 0;

    const language = "EN"
    const defaultCategory = 'N';
    const defaultCategoryCapitalized = 'NNP';

    const lexicon = new natural.Lexicon(language, defaultCategory, defaultCategoryCapitalized);
    const ruleSet = new natural.RuleSet('EN');
    const tagger = new natural.BrillPOSTagger(lexicon, ruleSet);
    for (let i = 0; i < sentences.length; i++) {
        let sentence = sentences[i];
        let words = tokenizer.tokenize(sentence);
        const taggedWords = tagger.tag(words).taggedWords;
        for (let j = 0; j < taggedWords.length; j++) {
            let taggedWord = taggedWords[j];
            if (nouns.includes(taggedWord.tag)) {
                nounCount++;
                break;
            }
        }
        for (let j = 0; j < taggedWords.length; j++) {
            let taggedWord = taggedWords[j];
            if (pronouns.includes(taggedWord.tag)) {
                pronounCount++;
                break;
            }
        }
        for (let j = 0; j < taggedWords.length; j++) {
            let taggedWord = taggedWords[j];
            if (adjectives.includes(taggedWord.tag)) {
                adjectiveCount++;
                break;
            }
        }
        for (let j = 0; j < taggedWords.length; j++) {
            let taggedWord = taggedWords[j];
            if (adverbs.includes(taggedWord.tag)) {
                adverbCount++;
                break;
            }
        }
    }
    let nounPercentage = (nounCount / sentences.length) * 100;
    let pronounPercentage = (pronounCount / sentences.length) * 100;
    let adjectivePercentage = (adjectiveCount / sentences.length) * 100;
    let adverbPercentage = (adverbCount / sentences.length) * 100;

    return {
        nouns: nounPercentage,
        pronouns: pronounPercentage,
        adjectives: adjectivePercentage,
        adverbs: adverbPercentage
    };
}
