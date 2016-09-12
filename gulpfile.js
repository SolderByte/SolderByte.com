var gulp = require('gulp');
var spawn = require('child_process').spawn;
var node;

var BOOTSTRAP = {
  js: {
    files: [
      './bower_components/bootstrap/dist/js/bootstrap.js',
      './bower_components/bootstrap/dist/js/bootstrap.min.js'
    ],
    dest: './site/static/vendors/js'
  },
  css: {
    files: [
      './bower_components/bootstrap/dist/css/bootstrap.css',
      './bower_components/bootstrap/dist/css/bootstrap.css.map',
      './bower_components/bootstrap/dist/css/bootstrap.min.css',
      './bower_components/bootstrap/dist/css/bootstrap.css.map'
    ],
    dest: './site/static/vendors/css'
  }
};

var TETHER = {
  js: {
    files: [
      './bower_components/tether/dist/js/tether.js',
      './bower_components/tether/dist/js/tether.min.js'
    ],
    dest: './site/static/vendors/js'
  },
  css: {
    files: [
      './bower_components/tether/dist/css/tether.css',
      './bower_components/tether/dist/css/tether.min.css'
    ],
    dest: './site/static/vendors/css'
  }
};

var JQUERY = {
  js: {
    files: [
      './bower_components/jquery/dist/jquery.js',
      './bower_components/jquery/dist/jquery.min.js',
      './bower_components/jquery/dist/jquery.min.map'
    ],
    dest: './site/static/vendors/js'
  },
};

var WATCH = {
  backend: [
    './lib/**/*',
    './routes/**/*',
    './email-templates/**/*'
  ],
  frontend: [
    './site/**/*'
  ]
};


gulp.task('bootstrap', ['bootstrap-js', 'bootstrap-css']);
gulp.task('bootstrap-js', function() {
  return gulp.src(BOOTSTRAP.js.files).pipe(gulp.dest(BOOTSTRAP.js.dest));
});
gulp.task('bootstrap-css', function() {
  return gulp.src(BOOTSTRAP.css.files).pipe(gulp.dest(BOOTSTRAP.css.dest));
});

gulp.task('tether', ['tether-js', 'tether-css']);
gulp.task('tether-js', function() {
  return gulp.src(TETHER.js.files).pipe(gulp.dest(TETHER.js.dest));
});
gulp.task('tether-css', function() {
  return gulp.src(TETHER.css.files).pipe(gulp.dest(TETHER.css.dest));
});

gulp.task('jquery', ['jquery-js']);
gulp.task('jquery-js', function() {
  return gulp.src(JQUERY.js.files).pipe(gulp.dest(JQUERY.js.dest));
});

gulp.task('bower', ['bootstrap', 'tether', 'jquery']);

gulp.task('default', ['watch']);

gulp.task('build');

gulp.task('serve', ['build'], function(cb) {
  if(node) {
    node.kill();
  }
  node = spawn('node', ['index.js'], {stdio: 'inherit'});
  node.on('close', function(code) {
    if(code === 8) {
      console.log('Error detected, waiting for changes...');
    }
  });
  cb(null);
});

gulp.task('watch', ['serve'], function() {
  gulp.watch(WATCH.frontend, ['serve']).on('change', reload);
  gulp.watch(WATCH.backend, ['serve']).on('change', reload);
});

var reload = function reload(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
};
