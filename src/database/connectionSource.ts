import { DataSource, DataSourceOptions } from 'typeorm';
import { options } from './config';

const connectionSource = new DataSource(options as DataSourceOptions);

export default connectionSource;
