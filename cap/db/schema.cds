namespace dumpster;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity Items : cuid, managed {
    @Core.MediaType   : mediatype
    content   : LargeBinary @stream;
    @Core.IsMediaType : true
    mediatype : String;
    name: String;
    size: Integer; // byte
    fileLastModified: DateTime
}