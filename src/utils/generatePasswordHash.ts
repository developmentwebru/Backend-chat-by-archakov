import bcrypt from 'bcrypt';

export default (password: string | number = "") => {
    return new Promise((resolve, reject) => {
        let newpassword = password.toString();
        bcrypt.hash(newpassword, 10, function(err, hash: string) {
            if (err) return reject(err);

            resolve(hash);
        });
    });
};