export class Song {
    constructor(
        public _id: String,
        public name: String,
        public number: Number,
        public gender: String,
        public file: String,
        public duration: String,
        public album: any
    ){}
}