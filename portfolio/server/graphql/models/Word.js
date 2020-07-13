class Word {
    constructor(model) {
        this.Model = model;
    }

    getAll() { return this.Model.find({}); }

    getById(id) { return this.Model.findById(id); }

    getAllByCode(languageCode) { return this.Model.find({ languageCode }); }

    getAllByPart(languageCode, part) { return this.Model.find({ languageCode, part }); };

    getWordByCodeAndKey(languageCode, key) { return this.Model.findOne({ languageCode, key }); };

    findAndDelete(id) { return this.Model.findOneAndRemove({ _id: id }); }
}

module.exports = Word;