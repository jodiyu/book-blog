// we generate sql code and then migrate to backend database neon 
import { db } from './index';
import { migrate } from 'drizzle-orm/neon-http/migrator';

const main = async () => {
    try {
        await migrate(db, {
            migrationsFolder: 'src/db/migrations',
        })
        console.log('Database migration completed successfully.');
    } catch (error) {
        console.error('Error during database migration:', error);
        process.exit(1); // exits with failure code
    }
}

main() // calling main function to execute migration