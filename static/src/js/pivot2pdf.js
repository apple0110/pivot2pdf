odoo.define('views2pdf.views2pdf', function (require) {
        "use strict";
    var core = require('web.core');
    var Model = require('web.DataModel');
    var WebClient = require('web.WebClient');
    var session = require('web.session');
    var ListView = require('web.ListView');
    var FormView = require('web.FormView');
    var PivotView = require('web.PivotView');
    var GraphView = require('web.GraphView');
    var CalendarView = require('web_calendar.CalendarView');
    var KanbanView = require('web_kanban.KanbanView');

    var _t = core._t;
    var QWeb = core.qweb;

    

    // override GraphView

    GraphView.include({

        render_buttons: function() {
            var result = this._super.apply(this, arguments); // Sets if (this.$buttons) {
            var self = this;
            if (this.$buttons) {
                    this.$buttons.on('click', '#create_pdf', function (e) {
                        e.preventDefault();
                        self.generate_pdf();

                    });
                    }
        },
        generate_pdf: function() {
            function createPDF() {
             var svg = $('.o_view_manager_content').find('svg')[0];
                        svgAsPngUri(svg, {}, function(uri) {
                            var doc = new jsPDF({
                                 unit: 'px',
                                 format: 'letter',
                                 orientation: 'landscape'
                             });
                            var title = $('ol.breadcrumb').find('li.active').html();
                            doc.setFont("helvetica");
                            doc.setFontType("bold");
                            doc.setTextColor(0,0,255);
                            doc.text(title, 20, 30);
                            doc.addImage(uri, 'PNG', 0, 60, 500,300);
                            doc.save('graph.pdf');
                    });
            }

            $('body').scrollTop(0);
            createPDF();

        },

    });

    
    // override PivotView

    PivotView.include({

        render_buttons: function() {
            var result = this._super.apply(this, arguments); // Sets if (this.$buttons) {
            var self = this;
            if (this.$buttons) {
                    this.$buttons.on('click', '#create_pdf', function (e) {
                        e.preventDefault();
                        self.generate_pdf();

                    });
                    }
        },
        generate_pdf: function() {
			var title = $('.o_facet_values span').html().trim();
			
			var doc = new jsPDF('2', 'px', 'a4');
			var totalPagesExp = "{total_pages_count_string}";

			doc.text(20, 15, title);
			
			doc.autoPrint()
			
			
			// It can parse html:
			doc.autoTable({
				html: '.table-condensed',
				theme: 'plain',
				didDrawPage: function (data) {
					

					// Footer
					var str = "Page " + doc.internal.getNumberOfPages()
					// Total page number plugin only available in jspdf v1.0+
					if (typeof doc.putTotalPages === 'function') {
						str = str + " of " + totalPagesExp;
					}
					doc.setFontSize(10);

					// jsPDF 1.4+ uses getWidth, <1.4 uses .width
					var pageSize = doc.internal.pageSize;
					var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
					doc.text(str, data.settings.margin.left, pageHeight - 10);
				},
				margin: {top: 30}
				});
			console.log(doc.autoTable);
			doc.save(title + '.pdf');
			
			// Total page number plugin only available in jspdf v1.0+
			if (typeof doc.putTotalPages === 'function') {
				doc.putTotalPages(totalPagesExp);
			}

        },

    });
    // override CalendarView

    CalendarView.include({
        render_buttons: function() {
            var result = this._super.apply(this, arguments); // Sets if (this.$buttons) {
            var self = this;
            if (this.$buttons) {
                    this.$buttons.on('click', '#create_pdf', function (e) {
                        e.preventDefault();
                        self.generate_pdf();

                    });
                    }

        },
        generate_pdf: function() {
            var form = $('.o_calendar_widget'),
            cache_width = form.width(),
            a4 = [800, 841.89]; // for a4 size paper width and height
            // create canvas object
            function getCanvas() {
                form.width((a4[0] * 1.33333) - 80).css('max-width', 'none');
                return html2canvas(form, {
                    imageTimeout: 2000,
                    removeContainer: true
                });
            }
            function createPDF() {
                getCanvas().then(function (canvas) {
                    var
                     img = canvas.toDataURL("image/png"),
                     doc = new jsPDF({
                         unit: 'px',
                         format: 'letter',
                         orientation: 'landscape'
                     });
                    var title = $('ol.breadcrumb').find('li.active').html();
                    doc.setFont("helvetica");
                    doc.setFontType("bold");
                    doc.setTextColor(0,0,255);
                    doc.text(title, 20, 30);
                    doc.addImage(img, 'JPEG', 20, 60);
                    doc.save('calendar.pdf');
                    form.width(cache_width);
                });
            }

            $('body').scrollTop(0);
            createPDF();

        },

    });
});