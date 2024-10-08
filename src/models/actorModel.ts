// actorModel.ts
import { Repository } from 'typeorm';
import { Actor } from '../entities/actor'; 
import { AppDataSource } from '../data-source';

export default class ActorModel {
  private static actorRepository: Repository<Actor> = AppDataSource.getRepository(Actor);

  static async getAllActors() {
    try {
      return await this.actorRepository.find();
    } catch (error) {
      console.error('Error fetching all actors:', error);
      throw new Error('Unable to fetch actors');
    }
  }

  static async getActorById(id: number) {
    try {
      const actor = await this.actorRepository.findOne({ where: { actorId: id } });
      if (!actor) {
        throw new Error(`Actor with ID ${id} not found`);
      }
      return actor;
    } catch (error) {
      console.error(`Error fetching actor with ID ${id}:`, error);
      throw new Error(`Unable to fetch actor with ID ${id}`);
    }
  }

  static async addActor(name: string, nationality: string, dob: string) {
    try {
      const actor = this.actorRepository.create({ name, nationality, dob });
      return await this.actorRepository.save(actor);
    } catch (error) {
      console.error('Error adding actor:', error);
      throw new Error('Unable to add actor');
    }
  }

  static async updateActorInfo(id: number, name: string, nationality: string, dob: string) {
    try {
      const actor = await this.getActorById(id);
      if (!actor) throw new Error(`Actor with ID ${id} not found`);

      await this.actorRepository.update(id, { name, nationality, dob });
      return await this.getActorById(id); 
    } catch (error) {
      console.error(`Error updating actor with ID ${id}:`, error);
      throw new Error(`Unable to update actor with ID ${id}`);
    }
  }

  static async deleteActor(id: number) {
    try {
      const actor = await this.getActorById(id);
      if (!actor) throw new Error(`Actor with ID ${id} not found`);

      await this.actorRepository.delete(id);
    } catch (error) {
      console.error(`Error deleting actor with ID ${id}:`, error);
      throw new Error(`Unable to delete actor with ID ${id}`);
    }
  }
}
