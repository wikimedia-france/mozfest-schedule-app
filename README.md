# mozfest-schedule-app

Exemple de modification à opérer pour actualiser l'application

```diff
diff --git a/index.html b/index.html
index 7ca80fc..50d6579 100644
--- a/index.html
+++ b/index.html
@@ -56,14 +56,14 @@
     </div>

     <script type="text/template" id="session-list-template">
+    <div id="thursday" class="schedule-tab">
+    </div>
+
     <div id="friday" class="schedule-tab">
     </div>

     <div id="saturday" class="schedule-tab">
     </div>
-
-    <div id="sunday" class="schedule-tab">
-    </div>
     </script>

     <!-- template used in tabs other than the search / all sessions tab view -->
@@ -274,15 +274,15 @@
         pathToTagsJson: 'tags.json',
         localStoragePrefix: 'iron-chef',
         tabList: [
-          { name: 'Vendredi', displayName: 'Ven', tabDate: new Date(2016,8,19) },
-          { name: 'Samedi', displayName: 'Sam', tabDate: new Date(2016,8,20) },
-          { name: 'Dimanche', displayName: 'Dim', tabDate: new Date(2016,8,21) },
+          { name: 'Jeudi', displayName: 'Jeu', tabDate: new Date(2017,10,19) },
+          { name: 'Vendredi', displayName: 'Ven', tabDate: new Date(2017,10,20) },
+          { name: 'Samedi', displayName: 'Sam', tabDate: new Date(2017,10,21) },
           { name: 'All', displayName: '<i class="fa fa-search"></i>' }
         ],
         additionalNavItems: [
           {
             label: "Code de conduite",
-            link: "https://meta.wikimedia.org/wiki/WikiConvention_francophone/2016/Code_de_conduite",
+            link: "https://meta.wikimedia.org/wiki/WikiConvention_francophone/2017/Code_de_conduite",
             id: "code-conduite"
           }
         ]
```
