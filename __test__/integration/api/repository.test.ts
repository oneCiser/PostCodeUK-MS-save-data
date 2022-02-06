import {PostCodeRepository} from "../../../src/repository";
import {PostCode} from "../../../src/models";
import { Connection } from 'mongoose';
import { Database } from '../../../src/config';

let db: Connection;
const idPostCode: string = "61ff2b08038d8016a0552663";
beforeAll(async () => {
  db = await Database.connect();
});

afterAll(() => {
  db.close();
});

describe('test PostCodeRepository',() => {
    it('create', async () => {
        const basePostCode = new PostCode({
            postcode: 'Esto es una prueba',
            nearestRadius:2,
            data: {
                name: 'Esto es una prueba'
            },
            location: {
                type: 'Point',
                coordinates: [1, 1]
            },
            points:[]
        })
        const postcode = await PostCodeRepository.create(basePostCode);
        expect(postcode._id).toBeDefined();
    });

    it('get by id', async () => {
        const postcode = await PostCodeRepository.getById(idPostCode);
        expect(postcode).toBeDefined();
        expect(postcode).not.toBeNull();
        if(postcode) {
            expect(postcode.postcode).toBe('Esto es una prueba');
        }
    });

    it('update', async () => {
        const response = await PostCodeRepository.getById(idPostCode);
        if(response) {
            response.nearestRadius = 3;
            const postcode = await PostCodeRepository.update(response);
            expect(postcode.nearestRadius).toBe(3);
        }
    });

    it('findNearestPostCodeByPoint', async () => {
        const point = {
            type: 'Point',
            coordinates: [1, 1]
        };
        const response: any = await PostCodeRepository.findNearestPostCodeByPoint(point);
        if(response) {
            expect(response.postcode).toBe('Esto es una prueba');
            expect(response.distance).toBeDefined();
        }
    });

    it('insertPointByPostCodeID', async () => {
        const point = {
            type: 'Point',
            coordinates: [2, 2]
        };
        const response = await PostCodeRepository.insertPointByPostCodeID(idPostCode, point);
        if(response) {
            expect(response.points[1]).toHaveProperty('coordinates');
            expect(response.points[1]).toHaveProperty('type');
        }
    });
})