import { UserEntity } from "../src/modules/users/entities/user.entity";
import { setSeederFactory } from "typeorm-extension";
import { UserRole } from "../src/modules/users/enums/user-role.enum";
import { UserGender, UserReligion, UserShortBio, UserStatus, UserZodiac } from "../src/modules/users/enums/user-data.enum";
import { UserInterest } from "../src/modules/users/enums/user-interest.enum";
import { userMaleImages, userFemaleImages } from "../src/modules/users/datas/user-images.data";

export default setSeederFactory(UserEntity, async (faker) => {
    const gender = faker.helpers.arrayElement(Object.values(UserGender));
    const status = faker.helpers.arrayElement(Object.values(UserStatus));
    const zodiac = faker.helpers.arrayElement(Object.values(UserZodiac));
    const religion = faker.helpers.arrayElement(Object.values(UserReligion));

    return new UserEntity({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: UserRole.USER,
        age: faker.number.int({ min: 18, max: 35 }),
        phone_number: faker.helpers.fromRegExp('628[0-9]{10}'),
        picture: gender === UserGender.MAN ? faker.helpers.arrayElement(userMaleImages) : faker.helpers.arrayElement(userFemaleImages),
        short_bio: faker.helpers.arrayElement(Object.values(UserShortBio)),
        about: `I am a ${gender}, currently ${status}, my zodiac sign is ${zodiac}, and I am a ${religion}`,
        interests: faker.helpers.shuffle(Object.values(UserInterest)).slice(0, 5).join(', '),
    });
});
