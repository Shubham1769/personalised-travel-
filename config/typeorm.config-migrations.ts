import { DataSource } from 'typeorm';
import { typeOrmConfigAdmin } from './typeorm.config';
export default new DataSource(typeOrmConfigAdmin);
