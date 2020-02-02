/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */
define(function (require, exports, module) {
    'use strict';
    
    //vars
    var CommandManager = brackets.getModule("command/CommandManager"),
        EditorManager = brackets.getModule("editor/EditorManager"),
        DocumentManager = brackets.getModule("document/DocumentManager"),
        Menus = brackets.getModule("command/Menus"),
        Commands = brackets.getModule("command/Commands"),
        AppInit = brackets.getModule("utils/AppInit"),
        KeyEvent = brackets.getModule("utils/KeyEvent"),
        KeyBindingManager = brackets.getModule("command/KeyBindingManager");
            
    function containsChar(word) {
        var erg;
        if (word.indexOf("&") > -1) {
            erg = true;
        } else if (word.indexOf("§") > -1) {
            erg = true;
        } else if (word.indexOf("ä") > -1) {
            erg = true;
        } else if (word.indexOf("ü") > -1) {
            erg = true;
        } else if (word.indexOf("ö") > -1) {
            erg = true;
        } else if (word.indexOf("ß") > -1) {
            erg = true;
        } else if (word.indexOf("à") > -1) {
            erg = true;
        } else if (word.indexOf("â") > -1) {
            erg = true;
        } else if (word.indexOf("á") > -1) {
            erg = true;
        } else if (word.indexOf("é") > -1) {
            erg = true;
        } else if (word.indexOf("è") > -1) {
            erg = true;
        } else if (word.indexOf("ê") > -1) {
            erg = true;
        } else if (word.indexOf("î") > -1) {
            erg = true;
        } else if (word.indexOf("ï") > -1) {
            erg = true;
        } else if (word.indexOf("í") > -1) {
            erg = true;
        } else if (word.indexOf("ô") > -1) {
            erg = true;
        } else if (word.indexOf("ó") > -1) {
            erg = true;
        } else if (word.indexOf("œ") > -1) {
            erg = true;
        } else if (word.indexOf("ù") > -1) {
            erg = true;
        } else if (word.indexOf("ü") > -1) {
            erg = true;
        } else if (word.indexOf("û") > -1) {
            erg = true;
        } else if (word.indexOf("«") > -1) {
            erg = true;
        } else if (word.indexOf("»") > -1) {
            erg = true;
        } else if (word.indexOf("’") > -1) {
            erg = true;
        } else if (word.indexOf("¿") > -1) {
            erg = true;
        } else if (word.indexOf("¡") > -1) {
            erg = true;
        } else if (word.indexOf("°") > -1) {
            erg = true;
        } else if (word.indexOf("Ä") > -1) {
            erg = true;
        } else if (word.indexOf("Ö") > -1) {
            erg = true;
        } else if (word.indexOf("Ü") > -1) {
            erg = true;
        } else if (word.indexOf("É") > -1) {
            erg = true;
        } else if (word.indexOf("È ") > -1) {
            erg = true;
        } else if (word.indexOf("À") > -1) {
            erg = true;
        } else if (word.indexOf("ç") > -1) {
            erg = true;
        } else if (word.indexOf("Ç") > -1) {
            erg = true;
        } else if (word.indexOf("Â") > -1) {
            erg = true;
        } else if (word.indexOf("Ê") > -1) {
            erg = true;
        } else if (word.indexOf("Î") > -1) {
            erg = true;
        } else if (word.indexOf("Ô") > -1) {
            erg = true;
        } else if (word.indexOf("Û") > -1) {
            erg = true;
        } else if (word.indexOf("ã") > -1) {
            erg = true;
        } else if (word.indexOf("Ã") > -1) {
            erg = true;
        } else if (word.indexOf("õ") > -1) {
            erg = true;
        } else if (word.indexOf("Õ") > -1) {
            erg = true;
        } else if (word.indexOf("ñ") > -1) {
            erg = true;
        } else if (word.indexOf("Ñ") > -1) {
            erg = true;
        } else if (word.indexOf("å") > -1) {
            erg = true;
        } else if (word.indexOf("Å") > -1) {
            erg = true;
        } else if (word.indexOf("æ") > -1) {
            erg = true;
        } else if (word.indexOf("Ø") > -1) {
            erg = true;
        } else if (word.indexOf("ø") > -1) {
            erg = true;
        } else if (word.indexOf("€") > -1) {
            erg = true;
        } else if (word.indexOf("•") > -1) {
            erg = true;
        } else if (word.indexOf("Ú") > -1) {
            erg = true;
        } else if (word.indexOf("ú") > -1) {
            erg = true;
        } else {
            erg = false;
        }
        return erg;
    }

    function clear(text, editor, start, end) {
        text = text.replace(/§/g, "&sect;").replace(/ä/g, "&auml;").replace(/ü/g, "&uuml;").replace(/ö/g, "&ouml;").replace(/ß/g, "&szlig;").replace(/à/g, "&agrave;").replace(/â/g, "&acirc;").replace(/á/g, "&aacute;").replace(/é/g, "&eacute;").replace(/è/g, "&egrave;").replace(/ê/g, "&ecirc;").replace(/î/g, "&icirc;").replace(/ï/g, "&iuml;").replace(/í/g, "&iacute;").replace(/ô/g, "&ocirc;").replace(/ó/g, "&oacute;").replace(/œ/g, "oe").replace(/ù/g, "&ugrave;").replace(/ü/g, "&uml;").replace(/û/g, "&ucirc;").replace(/«/g, "&laquo;").replace(/»/g, "&raquo;").replace(/’/g, "'").replace(/¿/g, "&iquest;").replace(/¡/g, "&iexcl;").replace(/°/g, "&deg;").replace(/Ä/g, "&Auml;").replace(/Ö/g, "&Ouml;").replace(/Ü/g, "&Uuml;").replace(/É/g, "&Eacute;").replace(/È /g, "&Egrave;").replace(/À/g, "&Agrave;").replace(/ç/g, "&ccedil;").replace(/Ç/g, "&Ccedil;").replace(/Â/g, "&Acirc;").replace(/Ê/g, "&Ecirc;").replace(/Î/g, "&Icirc;").replace(/Ô/g, "&Ocirc;").replace(/Û/g, "&Ucric;").replace(/ã/g, "&atilde;").replace(/Ã/g, "&Atilde;").replace(/õ/g, "&otilde;").replace(/Õ/g, "&Otilde;").replace(/ñ/g, "&ntilde;").replace(/Ñ/g, "&Ntilde;").replace(/å/g, "&aring;").replace(/Å/g, "&Aring;").replace(/æ/g, "&aelig;").replace(/Ø/g, "&Oslash;").replace(/ø/g, "&oslash;").replace(/€/g, "&euro;").replace(/•/g, "&bull;").replace(/ú/g, "&uacute;").replace(/Ú/g, "&Uacute;");

        editor.document.replaceRange(text, start, end);
    }
        
    var parseLine = function (line, cursorColumn) {
        var words;
        line = line.substring(0, cursorColumn);
        words = line.split(" ");
        return words[words.length - 1];
    };
    
    var keyEventHandler = function ($event, editor, event) {
        var cursorPosition,
            line,
            word,
            start;
        var activedocument = DocumentManager.getCurrentDocument();
        var language = activedocument.getLanguage();
        var commmand = CommandManager.get("specialchars.scselect");
        if (commmand.getChecked()) {
            if (((event.type === "keydown") && (event.keyCode === KeyEvent.DOM_VK_SPACE)) || ((event.type === "keydown") && (event.keyCode === KeyEvent.DOM_VK_ENTER)) || ((event.type === "keydown") && (event.keyCode === KeyEvent.DOM_VK_RIGHT))) {
                if (language.getId() === "html") {
                    cursorPosition = editor.getCursorPos();
                    line = editor.document.getLine(cursorPosition.line);
                    word = parseLine(line, cursorPosition.ch);
                    start = {
                        line: cursorPosition.line,
                        ch: cursorPosition.ch - word.length
                    };
                    if (containsChar(word) && commmand.getChecked()) {
                        clear(word, editor, start, cursorPosition);
                    }
                }
            }
        }
    };
            
    var activeEditorChangeHandler = function ($event, focusedEditor, lostEditor) {
        if (lostEditor) {
            $(lostEditor).off("keyEvent", keyEventHandler);
        }
        if (focusedEditor) {
            $(focusedEditor).on("keyEvent", keyEventHandler);
        }
    };
    
    function scSelect() {
        var commmand = CommandManager.get("specialchars.scselect");
        commmand.setChecked(!commmand.getChecked());
    }
    
    function select() {
        var editor = EditorManager.getFocusedEditor();
        editor.document.batchOperation(function () {
            var text;
            var selects = editor.getSelections();
            var selectionsCount = selects.length;
            if (selectionsCount > 1) {
                var text1 = editor.getSelectedText(true).split("\n").split(" ");
                var i;
                for (i = 0; i < selectionsCount; i++) {
                    text = clear(text1[i], editor, selects[i].start, selects[i].end);
                }
            } else {
                text = clear(editor.getSelectedText(true), editor, editor.getSelection().start, editor.getSelection().end);
            }
        });
    }
    
    AppInit.appReady(function () {
        CommandManager.register("SpecialChars", "specialchars.scselect", scSelect);
        var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
        menu.addMenuItem("specialchars.scselect");
        var newCommand = CommandManager.register("SpecialChars", "specialchars.scselect2", select);
        KeyBindingManager.addBinding(newCommand, { "key": "Ctrl-Shift-N" });
        var currentEditor = EditorManager.getCurrentFullEditor();
        $(currentEditor).on('keyEvent', keyEventHandler);
        $(EditorManager).on('activeEditorChange', activeEditorChangeHandler);
    });
});
