package edu.tarleton.coaching4literacy;

import java.util.Collection;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

@Stateless
public class ProductService {

    @PersistenceContext
    private EntityManager em;

    public void insert(String productName, String category, String quantity) {
        Product product = new Product();
        product.setProductName(productName);
        product.setCategory(category);
        product.setQuantity(quantity);
        em.persist(product);
    }
    
    public void edit(Integer id, String productName, String category, String quantity) {
        Product product = em.find(Product.class, id);
        product.setProductName(productName);
        product.setCategory(category);
        product.setQuantity(quantity);
    }

    public void removeProduct(Integer id) {
        Product prod = em.find(Product.class, id);
        em.remove(prod);
    }

    public Collection<Product> selectAll() {
        TypedQuery<Product> q = em.createNamedQuery("Product.selectAll", Product.class);
        return q.getResultList();
    }
}
