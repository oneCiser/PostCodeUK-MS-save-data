
import {IPostCode} from '../interfaces';
/**
 *
 * The PostCode repository 
 * @category Repositorys
 * @class PostCodeRepository
 */
class PostCodeRepositoy {


    create(postcode: IPostCode): Promise<IPostCode> {
        return new Promise<IPostCode>((resolve, reject) => {
            postcode.save()
                .then((postcode: IPostCode) => resolve(postcode))
                .catch(err => reject(err))
        })
    }

    async update(postcode: IPostCode): Promise<IPostCode> {
        return new Promise<IPostCode>(async (resolve, reject) => {
            try {
                if(postcode._id) await postcode.update();
                resolve(postcode);
            } catch (error) {
                reject(error);
            }
        });
    }

}