var firstLetterUpper = function(text) {
    return text.substring(0, 1).toUpperCase()+text.substring(1, text.length);
};

var textFormatting = function(text) {
    var textArr = text.toLowerCase().split(" ");
    textArr = textArr.map(function(text) {
        return firstLetterUpper(text);
    });
    return textArr.join(" ");
};

var skincareOptions = '<option id="cleansers" value="cleansers" selected>Cleansers</option><option id="eyeCare" value="eyeCare">Eye Care</option><option id="lipTreatments" value="lipTreatments">Lip Treatments</option><option id="masks" value="masks">Masks</option><option id="moisturizers" value="moisturizers">Moisturizers</option><option id="selfTannersForFace" value="selfTannersForFace">Self Tanners For Face</option><option id="shaving" value="shaving">Shaving</option><option id="sunCareForFace" value="sunCareForFace">Sun Care For Face</option><option id="treatments" value="treatments">Treatments</option>';
var makeupOptions = '<option id="cheek" value="cheek" selected>Cheek</option><option id="eye" value="eye">Eye</option><option id="face" value="face">Face</option><option id="lip" value="lip">Lip</option>';   
var hairOptions = '<option id="hairStylingAndTreatments" value="hairStylingAndTreatments" selected>Hair Styling and Treatments</option><option id="shampooAndConditioner" value="shampooAndConditioner">Shampoo And Conditioner</option>';
var fragranceOptions = '<option id="forMen" value="forMen" selected>For men</option><option id="forWomen" value="forWomen">For women</option><option id="unisex" value="unisex">Unisex</option>';
var bathAndBodyOptions = '<option id="selfTannersForBody" value="selfTannersForBody" selected>Self Tanners For Body</option><option id="sunCareForBody" value="sunCareForBody">Sun Care For Body</option>';

var updateProductTypeList = function(addOrEdit) {
    var selectedOption = $(".category_"+addOrEdit+" option:selected").attr("id");
    var options;
    $(".product_type_"+addOrEdit).html("");
    if (selectedOption === "skincare") {
        options = skincareOptions;
    }
    else if (selectedOption === "makeup") {
        options = makeupOptions;
    }
    else if (selectedOption === "hair") {
        options = hairOptions;
    }
    else if (selectedOption === "fragrance") {
        options = fragranceOptions;
    }
    else {
        options = bathAndBodyOptions;
    }
    $(".product_type_"+addOrEdit).append(options);
};

var writeBrandAndNameReturn = function(id) {
    var writeBrandAndName = function(id) {
        firestore.collection("Product").doc(id).get().then(function(doc) {
            $('#'+doc.id+' .itemTitleLink').text(textFormatting(doc.data()['brand'])+' '+textFormatting(doc.data()['name']));
            $('#'+doc.id+' .itemTitleLink').attr('href', doc.data()['url']); 
        });
    };
    return writeBrandAndName(id);
};

var itemInputFieldReset = function(addOrEdit) {
    $(".upc_"+addOrEdit).val("");
    $(".brand_"+addOrEdit).val("");
    $(".name_"+addOrEdit).val("");
    $(".category_"+addOrEdit).find("#skincare").prop("selected", true);
    updateProductTypeList(addOrEdit);
    $(".product_type_"+addOrEdit).find("#cleansers").prop("selected", true);
    $(".shelfLife_"+addOrEdit).val(0);
};

var editFunctionReturn = function(id) {
    var editFunction = function(id) {
        $('#'+id).find(".edit.btn").click(function(){
            firestore.collection("Product").doc(id).get().then(function(doc) {
                $(".upc_edit").val(doc.id);
                $(".brand_edit").val(textFormatting(doc.data()['brand']));
                $(".name_edit").val(textFormatting(doc.data()['name']));
                $(".shelfLife_edit").val(doc.data()['shelfLife']);
    
                $(".category_edit").find("#"+doc.data()['category']['id']).prop("selected", true);
                updateProductTypeList("edit");
                $(".product_type_edit").find("#"+doc.data()['product_type']['id']).prop("selected", true);
            }).then(function() {
                firestore.collection("User").doc(userID).collection("products").doc(id).get().then(function(doc) {
                    $(".openingDate_edit").val(dateFormatting(doc.data()['openingDate'].toDate()));
                });
            }).then(function() {
                $("#editItem").show();
            });
        });

        $("#editItem").submit(function(event){
            event.preventDefault();
            var upc = $(".upc_edit").val();
            var brand = $(".brand_edit").val().trim().toLowerCase();
            var name = $(".name_edit").val().trim().toLowerCase();
            var category = $(".category_edit option:selected").attr("id");
            var product_type = $(".product_type_edit option:selected").attr("id");
            var openingDate = new Date($(".openingDate_edit").val());
            openingDate.setHours(openingDate.getHours()+(new Date().getTimezoneOffset() / 60));
            var shelfLife = parseInt($(".shelfLife_edit").val());

            firestore.collection("Product").doc(upc).update({
                brand: brand,
                name: name,
                category: firestore.collection("Category").doc(category),
                product_type: firestore.collection("Product Type").doc(product_type),
                shelfLife: shelfLife,
            }).then(function(){
                firestore.collection("User").doc(userID).collection("products").doc(upc).update({
                    openingDate: new Date(openingDate),
                    expirationDate: new Date(openingDate.setMonth(openingDate.getMonth()+shelfLife))
                }).then(function() {
                    console.log("update successful");
                    window.location.reload(true);
                });
            }); 
        });
    };
    return editFunction(id);
};

var deleteFunctionReturn = function(id) {
    var deleteFunction = function(id) {
        $('#'+id).find(".delete.btn").click(function() {
            var setEmpty = false;
            firestore.collection("User").doc(userID).collection("products").get().then(function(querySnapshot) {
                if (querySnapshot.size === 1) {
                    setEmpty = true; 
                }
            }).then(function() {
                firestore.collection("User").doc(userID).collection("products").doc(id).delete().then(function() {     
                    console.log("Document successfully deleted!");
                    if (setEmpty === true) {
                        firestore.collection("User").doc(userID).set({ empty: true });
                    }
                    window.location.reload(true);
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            });
        });
    };
    return deleteFunction(id);
};

var twoDigits = function(num) {
    num = num.toString();
    if (num.length == 1) {
        num = "0"+num;
    }
    return num;
};

var dateFormatting = function(date) {
    var year = date.getFullYear();
    var month = twoDigits(date.getMonth()+1);
    var date = twoDigits(date.getDate());
    return year+"-"+month+"-"+date;
};

 //Function to take out everything after "@" in e-mail.
 function showEmail(string) {
    var indexNumber = string.indexOf("@");
    var newString = string.slice(0, indexNumber);
    return newString;
 };

var userID = "";
var userEmail ="";
var displayName ="";

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        authdata = user;
        userID = firebase.auth().currentUser.uid;
        userEmail = firebase.auth().currentUser.email;
        displayName = showEmail(userEmail);
        $("#email-display").text(displayName);
        
        $(".category_add").change(function() {
            updateProductTypeList("add");
        });
        
        $(".category_edit").change(function(){
            updateProductTypeList("edit");
        });

        var snapshot;
        firestore.collection("User").doc(userID).collection("products").get().then(function(querySnapshot) {
            $("#item-num-display").text(querySnapshot.size);
            snapshot = querySnapshot;
        }).catch(function(error) {
            console.log("Error getting document:", error);
        }).then(function() {
            snapshot.forEach(function(doc) {
                $("#itemListBody").append('<tr id='+doc.id+'><td scope="row">'+doc.id+'</td><td><span class="itemTitleLink"></span></td><td>'+dateFormatting(doc.data()['openingDate'].toDate())+'</td><td>'+dateFormatting(doc.data()['expirationDate'].toDate())+'</td><td><button class="edit btn" data-toggle="modal" data-target="#editItemModal">Edit</button></td><td><button class="delete btn btn-danger">Delete</button></td></tr>');
                writeBrandAndNameReturn(doc.id);
                editFunctionReturn(doc.id);
                deleteFunctionReturn(doc.id);
            });
        });

        $("#addItemButton").click(function() {
            itemInputFieldReset("add");
            var items = {};
            firestore.collection("Product").get().then(function(querySnapshot){
                querySnapshot.forEach(function(doc) {
                    items[doc.id] = doc.data();
                });
            }).then(function(){
                $(".upc_add").change(function(){
                    var upc = $(".upc_add").val();
                    if (upc in items) {
                        $(".brand_add").val(items[upc]["brand"]);
                        $(".name_add").val(items[upc]["name"]);
                        $(".category_add").find("#"+items[upc]['category']['id']).prop("selected", true);
                        updateProductTypeList("add");
                        $(".product_type_add").find("#"+items[upc]['product_type']['id']).prop("selected", true);
                        $(".shelfLife_add").val(items[upc]["shelfLife"]);
                    }
                });
            });
        });

        $("#addItem").submit(function(event) {
            event.preventDefault();
            var upc = $(".upc_add").val();
            var brand = $(".brand_add").val().trim().toLowerCase();
            var name = $(".name_add").val().trim().toLowerCase();
            var category = $(".category_add option:selected").attr("id");
            var product_type = $(".product_type_add option:selected").attr("id");
            var openingDate = new Date($(".openingDate_add").val());
            openingDate.setHours(openingDate.getHours()+(new Date().getTimezoneOffset() / 60));
            var shelfLife = parseInt($(".shelfLife_add").val());

            //search existing db with upc
            firestore.collection("Product").doc(upc).get().then(function(doc){
                if (!doc.exists) {
                    firestore.collection("Product").doc(upc).set({
                        brand: brand, 
                        name: name,
                        category: firestore.collection("Category").doc(category),
                        product_type: firestore.collection("Product Type").doc(product_type),
                        shelfLife: shelfLife,
                    })
                    .then(function() {
                        console.log("Product successfully written!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
                }
            }).then(function(){
                firestore.collection("User").doc(userID).get().then(function(doc){
                    if (doc.exists) {
                        if (doc.data()["empty"] === true) {
                            firestore.collection("User").doc(userID).update({
                                empty: false
                            });
                        }
                        firestore.collection("User").doc(userID).collection("products").doc(upc).set({
                            openingDate: new Date(openingDate),
                            expirationDate: new Date(openingDate.setMonth(openingDate.getMonth()+shelfLife)),
                            product: firestore.collection("Product").doc(upc),
                        }).then(function(){
                            console.log("Products add product success");
                            window.location.href = "manageItems.html";
                        });
                    }
                    else {
                        console.log("cannot find user");
                    }
                });
            });
        });
    }
    else {
        authdata = null;
    }
});

//Sign Out Function
var signOut = function () {
    firebase.auth().signOut().then(function () {
      alert("You have signed out successfully!");
    }).catch(function (err) {
      alert("Unable to sign out!");
    });
};
  
//Back to homepage button
$(document).ready(function() {
    $("#backToHomePage").click(function() {
        window.location.href = './index.html';
    });
    $("#signOutButton").click(function () {
        signOut();
        window.location.href = './index.html';
    });
});

