import multer from "multer";
import path from "path";

const __dirname = path.resolve();

const uploadFolder = path.join(__dirname, "./uploads");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.originalname.split(" ").join("-") +
                "-" +
                Date.now() +
                path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });

export default upload;
