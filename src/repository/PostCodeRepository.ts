
import {IPostCode} from '../interfaces';
import {PostCode} from '../models';
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

    getById(id: string): Promise<IPostCode | null> {
        return new Promise<IPostCode | null>((resolve, reject) => {
            PostCode.findById(id)
                .then((postcode: IPostCode | null) => resolve(postcode))
                .catch(err => reject(err));
        })
    }

}