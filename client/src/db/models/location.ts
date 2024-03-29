import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";

type Location = {
  _id: string;
  name: string;
  picture: string;
  lat: number;
  lng: number;
  operationalHour: number;
  province: string;
  address: string;
};
const DATABASE_NAME = "Eco_Bucks";
const COLLECTION_NAME = "location";

export type locationModel = {
  _id: ObjectId;
  name: string;
  picture: string;
  lat: number;
  lng: number;
  operationalHour: number;
  province: string;
  address: string;
  url: string | any | undefined;
};

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getLocation = async (search?: string | undefined) => {
  let pipeline = [];
  if (search) {
    pipeline.push({
      $match: {
        name: { $regex: new RegExp(search, "i") },
      },
    });
  }
  const db = await getDb();
  const result = (await db
    .collection(COLLECTION_NAME)
    .aggregate(pipeline)
    .toArray()) as locationModel[];

  return result;
};

export const getLocationById = async (id: string) => {
  const db = await getDb();
  const [result] = (await db
    .collection(COLLECTION_NAME)
    .find({ _id: new ObjectId(id) })
    .toArray()) as locationModel[];

  return result;
};
