(function(HTML) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

	module("HTML element creation");

	test("nested", function() {
		var nested = HTML.body.add('div>div');
		equal(nested.tagName, "DIV", "Tags created.");
		ok(HTML.body.div.only(-1).div, 'Tags found.');
		nested.parentNode.remove();
	});

	test("siblings with kids", function() {
		var h1 = HTML.body.add('section.bro+section.bro').add('h1');

		equal(h1.tagName, "H1", "Tag created");
		equal(h1.parentNode.tagName, "SECTION", "Tag within parent");
		ok(HTML.query('section h1').nodeType, "only the last section got an h1 kid");
		HTML.query('section.bro').remove();
	});

	test("element id", function() {
		ok(HTML.body.add('span#foo'), 'have element');
		equal(HTML.body.span.id, 'foo', 'has right id');
		HTML.query('#foo').remove();
	});

	test("element class", function() {
		ok(HTML.body.add('div#classes.bar.woogie'), 'have element');
		equal(HTML.query('#classes').getAttribute('class'), 'bar woogie', 'has right classes');
		HTML.query('#classes').remove();
	});

	test("element attr", 4, function() {
		ok(HTML.body.add('div#attrs[test foo=bar bar="woogie baz"]'), 'have element');
		var el = HTML.query('#attrs');
		equal(el.getAttribute('test'), '', 'has empty test attr');
		equal(el.getAttribute('foo'), 'bar', 'foo attr is bar');
		equal(el.getAttribute('bar'), 'woogie baz', 'bar attr is "woogie baz"');
		el.remove();
	});

	test("climb up context", 4, function() {
		equal(HTML.body.add('p>div>div>span^h2^^h1').tagName, 'H1', 'right element');
		ok(HTML.body.p.div.div.span, 'have initial tree');
		ok(HTML.body.p.div.h2, 'h2 went in right place');
		ok(HTML.body.h1, 'h1 went in right place');
		HTML.body.p.remove();
		HTML.body.h1.remove();
	});

	test("multiplier", 4, function() {
		var spans = HTML.body.add('span*5');

		ok(spans instanceof Array, "Multiple elements created and is array");
		ok(spans.length === 5, "Exact amount of elements preset");
		equal(spans[0].tagName, "SPAN", "Element specified created");
		equal(spans[0].parentNode.tagName, "BODY", "Appended!");
		spans.remove();
	});

	test("text", function() {
		var text = HTML.body.add('p#text{hello world!}');
		ok(text, 'have element');
		equal(HTML.query('#text').textContent, 'hello world!', 'has right text');
		text.remove();
		var mixed = HTML.body.add('p#mixed{a}>span+{ b}');
		equal(mixed.textContent, 'a b', 'both text parts');
		ok(mixed.span, 'and child node');
		mixed.remove();
	});

}(HTML));
