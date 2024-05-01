import { v1 } from 'uuid';
import { ICreatedSize } from '~/interface/request';
import { sizes } from '~/models';

export async function getAll() {
     const rerult = await sizes.find({});
     return rerult;
}
export async function creat(params: ICreatedSize) {
     const size = new sizes({
          id: v1(),
          name: params.name,
     });
     await size.save();
     return size;
}
