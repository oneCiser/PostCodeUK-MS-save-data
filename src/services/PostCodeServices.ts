
import {IPostCode, IPoint}  from '../interfaces';
import {PostCodeRepository} from '../repository';



/**
 *
 * The PostCode service,layer of repository pattern
 * @category Services
 * @class PostCodeService
 */
 class PostCodeService {

     /** 
      * @description create a new postcode
      * @param {IPostCode} postcode
      * @returns {Promise<IPostCode>} a create PostCode
      * @memberof PostCodeService
      */

     async create(postcode: IPostCode): Promise<IPostCode> {
         return new Promise<IPostCode>((resolve, reject) => {
             PostCodeRepository.create(postcode)
             .then((postcode: IPostCode) => resolve(postcode))
             .catch(err => reject(err))
         })
     }


     /**
      * @description update a postcode
      * @param {IPostCode} postcode the postcode to update
      * @returns {Promise<IPostCode>} a update PostCode
      * @memberof PostCodeService
      */
     async update(postcode: IPostCode): Promise<IPostCode> {
         return new Promise<IPostCode>(async (resolve, reject) => {
             try {
                 if(postcode._id) await PostCodeRepository.update(postcode);
                 resolve(postcode);
             } catch (error) {
                 reject(error);
             }
         });
     }
     /**
      * @description find a postcode by id and insert a point into it
      * @param {string} postcodeID 
      * @param {IPoint} point 
      * @returns {Promise<IPostCode | null>} return a PostCode with the inserted point finded by id if exist or null
      * @memberof PostCodeService
      */
     async insertPointByPostCodeID(postcodeID: string, point: IPoint): Promise<IPostCode | null> {
         return new Promise<IPostCode | null>(async (resolve, reject) => {
             PostCodeRepository.insertPointByPostCodeID(postcodeID, point)
             .then((postcode: IPostCode | null) => resolve(postcode))
             .catch(err => reject(err))
         });
     }

     async findNearestPostCodeByPoint(point: IPoint): Promise<IPostCode | null> {
         return new Promise<IPostCode | null>(async (resolve, reject) => {
             
             PostCodeRepository.findNearestPostCodeByPoint(point)
             .then((postcode: IPostCode | null) => resolve(postcode))
             .catch(err => reject(err))
         })
     }
 }

 export default new PostCodeService();