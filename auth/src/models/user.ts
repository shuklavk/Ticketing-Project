import mongoose from 'mongoose';
import { Password } from '../services/password';
// An interface that describes the properties that are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that an User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    // the toJSON portion helps make sure we just get a response with id and email rather than
    // _id, email, password, and __v. This is important because if services have different databases
    // we need to make sure they would return similar objects, and having _id rather than id is only a Mongo thing
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);

UserSchema.pre('save', async function(done) {
  // only hash password if created/modified
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

UserSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema);

export { User };
