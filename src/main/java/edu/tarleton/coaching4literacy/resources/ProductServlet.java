package edu.tarleton.coaching4literacy.resources;

import edu.tarleton.coaching4literacy.ProductService;
import java.io.IOException;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "ProductServlet", urlPatterns = {"/Products"})
public class ProductServlet extends HttpServlet {

    @EJB
    private ProductService productService;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String productName = request.getParameter("productName");
        String category = request.getParameter("category");
        String quantity = request.getParameter("quantity");
        productService.insert(productName, category, quantity);
        response.sendRedirect("index.html");
    }

}
