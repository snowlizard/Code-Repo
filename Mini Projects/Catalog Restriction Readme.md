**Ticket Access**

Ticket Access table is used to restrict access to records within the ServiceNow instance.

Supported tables:

- Requested Item (sc\_req\_item)
- Catalog Task (sc\_task)

![](RackMultipart20231116-1-ozr2gk_html_da390b3663762d00.png)

**Notes**

You are limited to creating one record per catalog without a category

- Creating a record with no category restricts that entire catalog to the specified groups and users

You can not create multiple records with the same Category within the same catalog.

Ticket Access does not restrict any Catalogs/Categories unless a record is created within the table.

Access is granted to users if they contain any group or role specified in the record.