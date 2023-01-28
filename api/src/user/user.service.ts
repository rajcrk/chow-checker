import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './models/create-user.dto';
import { UserDocument } from './schemas/user.schema';
import { UserDetails } from './user-details.interface';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UserService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>) {

  }

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async create(
    name: string,
    email: string,
    hashedPassword: string): Promise<UserDocument> {
    // Creating a new user
    const newUser = new this.userModel(
      { name, email, password: hashedPassword });
    return newUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();

    if (!user) return null;

    return this._getUserDetails(user);
  }
}