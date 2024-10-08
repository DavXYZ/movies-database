import ActorModel from '../models/actorModel';
import { Actor } from '../entities/actor'; // Adjust the import path as necessary

export default class ActorService {
  
  static async getAllActors(): Promise<Actor[]> {
    try {
      return await ActorModel.getAllActors();
    } catch (error) {
      console.error('Error fetching all actors:', error);
      throw new Error('Failed to fetch actors');
    }
  }

  static async getActorById(id: number): Promise<Actor | undefined> {
    try {
      const actor = await ActorModel.getActorById(id);
      if (!actor) throw new Error('Actor not found');
      return actor;
    } catch (error) {
      console.error(`Error fetching actor with id ${id}:`, error);
      throw new Error('Failed to fetch actor');
    }
  }

  static async addActor(name: string, nationality: string, dob: string): Promise<Actor> {
    try {
      return await ActorModel.addActor(name, nationality, dob);
    } catch (error) {
      console.error('Error adding actor:', error);
      throw new Error('Failed to add actor');
    }
  }

  static async updateActorInfo(id: number, name: string, nationality: string, dob: string): Promise<Actor | null> {
    try {
      const actor = await ActorModel.getActorById(id);
      if (!actor) throw new Error('Actor not found');
      return await ActorModel.updateActorInfo(id, name, nationality, dob);
    } catch (error) {
      console.error(`Error updating actor with id ${id}:`, error);
      throw new Error('Failed to update actor');
    }
  }

  static async deleteActor(id: number): Promise<void> {
    try {
      const actor = await ActorModel.getActorById(id);
      if (!actor) throw new Error('Actor not found');
      await ActorModel.deleteActor(id);
    } catch (error) {
      console.error(`Error deleting actor with id ${id}:`, error);
      throw new Error('Failed to delete actor');
    }
  }
}
