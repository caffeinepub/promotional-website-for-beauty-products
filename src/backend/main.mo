import List "mo:core/List";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Contact Form Inquiry Management
  type Inquiry = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module Inquiry {
    public func compare(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      switch (Text.compare(inquiry1.name, inquiry2.name)) {
        case (#equal) { Text.compare(inquiry1.email, inquiry2.email) };
        case (order) { order };
      };
    };
  };

  let inquiries = List.empty<Inquiry>();

  // Public endpoint - anyone can submit contact inquiries (including guests)
  public shared ({ caller }) func createInquiry(name : Text, email : Text, message : Text) : async Bool {
    let inquiry : Inquiry = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    inquiries.add(inquiry);
    true;
  };

  // Admin-only endpoint - only admins can view all contact inquiries
  public query ({ caller }) func listInquiries() : async [Inquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all inquiries");
    };
    inquiries.values().toArray().sort();
  };

  // Product Management
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    image : Text;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.id, product2.id);
    };
  };

  let products = Map.empty<Nat, Product>();

  public query func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductById(id : Nat) : async ?Product {
    products.get(id);
  };

  public shared ({ caller }) func addProduct(id : Nat, name : Text, description : Text, price : Nat, image : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let product : Product = {
      id;
      name;
      description;
      price;
      image;
    };
    products.add(id, product);
  };

  public shared ({ caller }) func updateProduct(id : Nat, name : Text, description : Text, price : Nat, image : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    let product : Product = {
      id;
      name;
      description;
      price;
      image;
    };
    products.add(id, product);
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    products.remove(id);
  };

  // Testimonial Management
  type Testimonial = {
    author : Text;
    content : Text;
    rating : Nat;
  };

  module Testimonial {
    public func compare(testimonial1 : Testimonial, testimonial2 : Testimonial) : Order.Order {
      Text.compare(testimonial1.author, testimonial2.author);
    };
  };

  let testimonials = List.empty<Testimonial>();

  public query func getAllTestimonials() : async [Testimonial] {
    testimonials.toArray().sort();
  };

  public query ({ caller }) func getTestimonialByAuthor(author : Text) : async ?Testimonial {
    let iter = testimonials.values();
    let found = iter.filter(func(testimonial) { testimonial.author == author });
    let results = found.toArray();
    if (results.size() > 0) {
      ?results[0];
    } else {
      null;
    };
  };

  public shared ({ caller }) func addTestimonial(author : Text, content : Text, rating : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add testimonials");
    };
    let testimonial : Testimonial = {
      author;
      content;
      rating;
    };
    testimonials.add(testimonial);
  };

  public shared ({ caller }) func updateTestimonial(author : Text, content : Text, rating : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update testimonials");
    };

    let updated = testimonials.map<Testimonial, Testimonial>(
      func(testimonial) {
        if (testimonial.author == author) {
          {
            author;
            content;
            rating;
          };
        } else {
          testimonial;
        };
      }
    );

    testimonials.clear();
    let iter = updated.values();
    iter.forEach(func(testimonial) { testimonials.add(testimonial) });
  };

  public shared ({ caller }) func deleteTestimonial(author : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete testimonials");
    };

    let filtered = testimonials.filter(
      func(testimonial) {
        testimonial.author != author;
      }
    );

    testimonials.clear();
    let iter = filtered.values();
    iter.forEach(func(testimonial) { testimonials.add(testimonial) });
  };

  // Newsletter Subscription Management
  type NewsletterSignup = {
    email : Text;
    timestamp : Time.Time;
  };

  module NewsletterSignup {
    public func compare(signup1 : NewsletterSignup, signup2 : NewsletterSignup) : Order.Order {
      Text.compare(signup1.email, signup2.email);
    };
  };

  let newsletterSignups = List.empty<NewsletterSignup>();

  public shared ({ caller }) func subscribeToNewsletter(email : Text) : async Bool {
    let signup : NewsletterSignup = {
      email;
      timestamp = Time.now();
    };
    newsletterSignups.add(signup);
    true;
  };

  public query ({ caller }) func listNewsletterSignups() : async [NewsletterSignup] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all newsletter signups");
    };
    newsletterSignups.toArray();
  };
};
