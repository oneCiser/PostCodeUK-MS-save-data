
import {IPostCode, IPoint} from '../interfaces';
import {PostCode} from '../models';
/**
 *
 * The PostCode repository 
 * @category Repositorys
 * @class PostCodeRepository
 */
class PostCodeRepository {

    /**
     * @description create a new postcode
     * @param {IPostCode} postcode 
     * @returns {Promise<IPostCode>} a create PostCode
     * @memberof PostCodeRepository
     */
    create(postcode: IPostCode): Promise<IPostCode> {
        return new Promise<IPostCode>((resolve, reject) => {
            const newPostCode = new PostCode(postcode);
            newPostCode.save()
                .then((postcode: IPostCode) => resolve(postcode))
                .catch(err => reject(err))
        })
    }

    /**
     * @description update a postcode
     * @param {IPostCode} postcode 
     * @returns {Promise<IPostCode>} a update PostCode
     * @memberof PostCodeRepository
     */
    async update(postcode: IPostCode): Promise<IPostCode> {
        return new Promise<IPostCode>(async (resolve, reject) => {
            try {
                const { _id, ...rest } = postcode;
                if(postcode._id) await PostCode.findByIdAndUpdate(postcode._id, rest);
                resolve(postcode);
            } catch (error) {
                reject(error);
            }
        });
    }


    /**
     * @description find a postcode by id
     * @param {string} id - The id to find
     * @returns {Promise<IPostCode | null>} return a PostCode if exist or null
     * @memberof PostCodeRepository
     */
    getById(id: string): Promise<IPostCode | null> {
        return new Promise<IPostCode | null>((resolve, reject) => {
            PostCode.findById(id)
                .then((postcode: IPostCode | null) => resolve(postcode))
                .catch(err => reject(err));
        })
    }

    /**
     * @description find nearest postcode by point in a distance radius lest or equal to nearestRadius
     * @param {IPoint} point point to find
     * @returns {Promise<IPostCode | null>} return a PostCode if exist or null
     * @memberof PostCodeRepository
     */
    findNearestPostCodeByPoint(point: IPoint): Promise<IPostCode | null> {

        return new Promise<IPostCode | null>((resolve, reject) => {
            PostCode.aggregate([
                { "$geoNear": {
                    "near": point,
                    "spherical": true,
                    "distanceField": "distance"
                  }},
                  { "$redact": {
                    "$cond": {
                      "if": { "$lte": [ "$distance", "$nearestRadius" ] },
                      "then": "$$KEEP",
                      "else": "$$PRUNE"
                    }
                  }},
                  {$limit: 1}
            ])
            .then((postcode: IPostCode[]) => {
                if(postcode.length > 0) resolve(postcode[0]);
                else{resolve(null);}
            })
            .catch(err => reject(err));
        })

    }


    /**
     * @description find a postcode by id and insert the specified point
     * @param {string} id 
     * @param {IPoint} point 
     * @returns {Promise<IPostCode | null>} return the PostCode with the new point if PostCode exist or null
     * @memberof PostCodeRepository
     */
    insertPointByPostCodeID(id: string, point: IPoint): Promise<IPostCode | null> {
        return new Promise<IPostCode | null>((resolve, reject) => {
            PostCode.findByIdAndUpdate(id, {
                $push: {
                    points: point
                }
            })
            .then((postcode: IPostCode | null) => resolve(postcode))
            .catch(err => reject(err));
        })
        
    }

}

export default new PostCodeRepository();