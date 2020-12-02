package edu.tarleton.coaching4literacy;

import java.util.Collection;
import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

@Path("products")
public class ProductsWS {

    @EJB
    private ProductService productService;

    @GET
    @Produces("application/json")
    public Response read() {
        Collection<Product> products = productService.selectAll();
        Product[] i = toArray(products);
        return Response.ok(i).build();
    }

    @DELETE
    @Path("{id}")
    @Produces("application/json")
    @Consumes("application/json")
    public Response delete(@PathParam("id") Integer id) {
        productService.removeProduct(id);
        return read();
    }

    private Product[] toArray(Collection<Product> products) {
        Product[] i = new Product[products.size()];
        return products.toArray(i);
    }
}
