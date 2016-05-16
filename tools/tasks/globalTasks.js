/* eslint-disable */
'use strict';

module.exports = function(gulp, config) {
    var OPTIONS = config;

    var rimraf = require('rimraf');

    ////////////////////////////////////////////////////////////////////
    // CLEAN DESTINATION FILES
    ////////////////////////////////////////////////////////////////////
    // gulp.task('clean:dest', function(cb) {
    //     rimraf(OPTIONS.DIR.DEST, cb);
    // });

    ////////////////////////////////////////////////////////////////////
    // CLEAN DESTINATION ASSET FILES
    ////////////////////////////////////////////////////////////////////
    gulp.task('clean:dest:assets', function(cb) {
        rimraf(OPTIONS.DIR.DEST_ASSETS, cb);
    });

    ////////////////////////////////////////////////////////////////////
    // CLEAN DOCS/API FOLDER
    ////////////////////////////////////////////////////////////////////
    // gulp.task('clean:docs:api', function(cb) {
    //     rimraf(OPTIONS.DIR.DOCS_API, cb);
    // });

    ////////////////////////////////////////////////////////////////////
    // CLEAN DOCS/COVERAGE FOLDER
    ////////////////////////////////////////////////////////////////////
    // gulp.task('clean:docs:coverage', function(cb) {
    //     rimraf(OPTIONS.DIR.DOCS_COVERAGE, cb);
    // });

    ////////////////////////////////////////////////////////////////////
    // CLEAN TEMP FOLDERS
    ////////////////////////////////////////////////////////////////////
    gulp.task('clean:temp', function(cb) {
        rimraf(OPTIONS.DIR.TEMP_FOLDER, cb);
    });

    ////////////////////////////////////////////////////////////////////
    // COPY MEDIA FILES
    ////////////////////////////////////////////////////////////////////
    // gulp.task('copy:media', ['clean:client'], function() {
    //     return gulp
    //         .src(paths.GLOB.SRC_MEDIA, { base: paths.DIR.SRC_MEDIA })
    //         .pipe(gulp.dest(paths.DIR.DEST_MEDIA));
    // });

    ////////////////////////////////////////////////////////////////////
    // BUMP PROJECT VERSION NUMBER
    ////////////////////////////////////////////////////////////////////
    var bump = require('gulp-bump');

    gulp.task('bump', function() {
        return gulp.src([OPTIONS.FILE.PKG_JSON])
            .pipe(bump())
            .pipe(gulp.dest(OPTIONS.ROOT));
    });

    ////////////////////////////////////////////////////////////////////
    // PUSH TAG TO GIT
    ////////////////////////////////////////////////////////////////////
    var git = require('gulp-git');

    gulp.task('tag', function() {
        var pkg = require(OPTIONS.FILE.PKG_JSON);
        var version = 'v' + pkg.version;
        var commitMessage = 'Release ' + version;

        return gulp.src(OPTIONS.ROOT)
            .pipe(git.commit(commitMessage))
            .pipe(git.tag(version, commitMessage))
            .pipe(git.push('origin', 'master', '--tags'))
            .pipe(gulp.dest(OPTIONS.ROOT));
    });

    ////////////////////////////////////////////////////////////////////
    // TASKS
    ////////////////////////////////////////////////////////////////////
    var runSequence = require('run-sequence');

    gulp.task('clean', ['clean:dest:assets']);
    gulp.task('release', function() {
        runSequence(
            'build',
            'bump',
            'tag'
        );
    });
}
