using dumpster as db from '../db/schema';

service DumpsterService {
    entity Items as projection on db.Items;
}