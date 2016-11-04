$(function(){

	Point = function (x, y, z, label) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.label = label;
	}

	Point.prototype = {
		dist: function (p) {
			var x = Math.abs(p.x - this.x);
			var y = Math.abs(p.y - this.y);
			var z = Math.abs(p.z - this.z);

			return Math.sqrt(x * x + y * y + z * z);
		}
	};

	function rgb_from_hex(triplet) {
		triplet = triplet.replace("#", "");

		if (triplet.length == 3) // #rgb == #rrggbb
		{
			triplet = triplet[0] + triplet[0]
					+ triplet[1] + triplet[1]
					+ triplet[2] + triplet[2];
		}

		value = parseInt(triplet, 16);
		var b = Math.floor(value % 256);
		var g = Math.floor((value / 256) % 256);
		var r = Math.floor((value / (256 * 256)) % 256);
		return new Point(r, g, b);
	}

	ColorClassifier = function () {
		this.data = [
			{"x": 93, "y": 138, "z": 168, "label": "Air Force blue"},
			{"x": 229, "y": 43, "z": 80, "label": "Amaranth"},
			{"x": 255, "y": 191, "z": 0, "label": "Amber"},
			{"x": 255, "y": 126, "z": 0, "label": "Amber (SAE/ECE)"},
			{"x": 242, "y": 243, "z": 244, "label": "Anti-flash white"},
			{"x": 205, "y": 149, "z": 117, "label": "Antique brass"},
			{"x": 145, "y": 92, "z": 131, "label": "Antique fuchsia"},
			{"x": 251, "y": 206, "z": 177, "label": "Apricot"},
			{"x": 0, "y": 255, "z": 255, "label": "Aqua"},
			{"x": 127, "y": 255, "z": 212, "label": "Aquamarine"},
			{"x": 135, "y": 169, "z": 107, "label": "Asparagus"},
			{"x": 255, "y": 153, "z": 102, "label": "Atomic tangerine"},
			{"x": 165, "y": 42, "z": 42, "label": "Auburn"},
			{"x": 0, "y": 127, "z": 255, "label": "Azure"},
			{"x": 240, "y": 255, "z": 255, "label": "Azure mist/web"},
			{"x": 137, "y": 207, "z": 240, "label": "Baby blue"},
			{"x": 250, "y": 231, "z": 181, "label": "Banana Mania"},
			{"x": 255, "y": 225, "z": 53, "label": "Banana yellow"},
			{"x": 132, "y": 132, "z": 130, "label": "Battleship grey"},
			{"x": 245, "y": 245, "z": 220, "label": "Beige"},
			{"x": 255, "y": 228, "z": 196, "label": "Bisque"},
			{"x": 61, "y": 43, "z": 31, "label": "Bistre"},
			{"x": 49, "y": 140, "z": 231, "label": "Bleu de France"},
			{"x": 172, "y": 229, "z": 238, "label": "Blizzard Blue"},
			{"x": 250, "y": 240, "z": 190, "label": "Blond"},
			{"x": 51, "y": 51, "z": 153, "label": "Blue (pigment)"},
			{"x": 2, "y": 71, "z": 254, "label": "Blue (RYB)"},
			{"x": 162, "y": 162, "z": 208, "label": "Blue Bell"},
			{"x": 222, "y": 93, "z": 131, "label": "Blush"},
			{"x": 121, "y": 68, "z": 59, "label": "Bole"},
			{"x": 0, "y": 149, "z": 182, "label": "Bondi blue"},
			{"x": 181, "y": 166, "z": 66, "label": "Brass"},
			{"x": 203, "y": 65, "z": 84, "label": "Brick red"},
			{"x": 29, "y": 172, "z": 214, "label": "Bright cerulean"},
			{"x": 255, "y": 0, "z": 127, "label": "Bright pink"},
			{"x": 8, "y": 232, "z": 222, "label": "Bright turquoise"},
			{"x": 209, "y": 159, "z": 232, "label": "Bright ube"},
			{"x": 0, "y": 66, "z": 37, "label": "British racing green"},
			{"x": 205, "y": 127, "z": 50, "label": "Bronze"},
			{"x": 150, "y": 75, "z": 0, "label": "Brown (traditional)"},
			{"x": 240, "y": 220, "z": 130, "label": "Buff"},
			{"x": 72, "y": 6, "z": 7, "label": "Bulgarian rose"},
			{"x": 128, "y": 0, "z": 32, "label": "Burgundy"},
			{"x": 138, "y": 51, "z": 36, "label": "Burnt umber"},
			{"x": 189, "y": 51, "z": 164, "label": "Byzantine"},
			{"x": 112, "y": 41, "z": 99, "label": "Byzantium"},
			{"x": 0, "y": 107, "z": 60, "label": "Cadmium green"},
			{"x": 237, "y": 135, "z": 45, "label": "Cadmium orange"},
			{"x": 227, "y": 0, "z": 34, "label": "Cadmium red"},
			{"x": 30, "y": 77, "z": 43, "label": "Cal Poly Pomona green"},
			{"x": 163, "y": 193, "z": 173, "label": "Cambridge Blue"},
			{"x": 193, "y": 154, "z": 107, "label": "Camel"},
			{"x": 228, "y": 113, "z": 122, "label": "Candy pink"},
			{"x": 0, "y": 191, "z": 255, "label": "Capri"},
			{"x": 89, "y": 39, "z": 32, "label": "Caput mortuum"},
			{"x": 235, "y": 76, "z": 66, "label": "Carmine pink"},
			{"x": 255, "y": 0, "z": 56, "label": "Carmine red"},
			{"x": 255, "y": 166, "z": 201, "label": "Carnation pink"},
			{"x": 172, "y": 225, "z": 175, "label": "Celadon"},
			{"x": 178, "y": 255, "z": 255, "label": "Celeste (colour)"},
			{"x": 73, "y": 151, "z": 208, "label": "Celestial blue"},
			{"x": 42, "y": 82, "z": 190, "label": "Cerulean blue"},
			{"x": 0, "y": 122, "z": 165, "label": "CG Blue"},
			{"x": 250, "y": 214, "z": 165, "label": "Champagne"},
			{"x": 223, "y": 255, "z": 0, "label": "Chartreuse (traditional)"},
			{"x": 255, "y": 183, "z": 197, "label": "Cherry blossom pink"},
			{"x": 123, "y": 63, "z": 0, "label": "Chocolate (traditional)"},
			{"x": 255, "y": 167, "z": 0, "label": "Chrome yellow"},
			{"x": 227, "y": 66, "z": 52, "label": "Cinnabar"},
			{"x": 210, "y": 105, "z": 30, "label": "Cinnamon"},
			{"x": 228, "y": 208, "z": 10, "label": "Citrine"},
			{"x": 251, "y": 204, "z": 231, "label": "Classic rose"},
			{"x": 0, "y": 71, "z": 171, "label": "Cobalt"},
			{"x": 210, "y": 105, "z": 30, "label": "Cocoa brown"},
			{"x": 111, "y": 78, "z": 55, "label": "Coffee"},
			{"x": 155, "y": 221, "z": 255, "label": "Columbia blue"},
			{"x": 0, "y": 46, "z": 99, "label": "Cool black"},
			{"x": 184, "y": 115, "z": 51, "label": "Copper"},
			{"x": 255, "y": 56, "z": 0, "label": "Coquelicot"},
			{"x": 248, "y": 131, "z": 121, "label": "Coral pink"},
			{"x": 137, "y": 63, "z": 69, "label": "Cordovan"},
			{"x": 179, "y": 27, "z": 27, "label": "Cornell Red"},
			{"x": 255, "y": 248, "z": 220, "label": "Cornsilk"},
			{"x": 255, "y": 188, "z": 217, "label": "Cotton candy"},
			{"x": 220, "y": 20, "z": 60, "label": "Crimson"},
			{"x": 0, "y": 255, "z": 255, "label": "Cyan"},
			{"x": 0, "y": 183, "z": 235, "label": "Cyan (process)"},
			{"x": 255, "y": 255, "z": 49, "label": "Daffodil"},
			{"x": 240, "y": 225, "z": 48, "label": "Dandelion"},
			{"x": 0, "y": 0, "z": 139, "label": "Dark blue"},
			{"x": 101, "y": 67, "z": 33, "label": "Dark brown"},
			{"x": 93, "y": 57, "z": 84, "label": "Dark byzantium"},
			{"x": 164, "y": 0, "z": 0, "label": "Dark candy apple red"},
			{"x": 8, "y": 69, "z": 126, "label": "Dark cerulean"},
			{"x": 152, "y": 105, "z": 96, "label": "Dark chestnut"},
			{"x": 205, "y": 91, "z": 69, "label": "Dark coral"},
			{"x": 0, "y": 139, "z": 139, "label": "Dark cyan"},
			{"x": 83, "y": 104, "z": 120, "label": "Dark electric blue"},
			{"x": 184, "y": 134, "z": 11, "label": "Dark goldenrod"},
			{"x": 169, "y": 169, "z": 169, "label": "Dark gray"},
			{"x": 1, "y": 50, "z": 32, "label": "Dark green"},
			{"x": 26, "y": 36, "z": 33, "label": "Dark jungle green"},
			{"x": 189, "y": 183, "z": 107, "label": "Dark khaki"},
			{"x": 72, "y": 60, "z": 50, "label": "Dark lava"},
			{"x": 115, "y": 79, "z": 150, "label": "Dark lavender"},
			{"x": 139, "y": 0, "z": 139, "label": "Dark magenta"},
			{"x": 0, "y": 51, "z": 102, "label": "Dark midnight blue"},
			{"x": 85, "y": 107, "z": 47, "label": "Dark olive green"},
			{"x": 255, "y": 140, "z": 0, "label": "Dark orange"},
			{"x": 153, "y": 50, "z": 204, "label": "Dark orchid"},
			{"x": 119, "y": 158, "z": 203, "label": "Dark pastel blue"},
			{"x": 3, "y": 192, "z": 60, "label": "Dark pastel green"},
			{"x": 150, "y": 111, "z": 214, "label": "Dark pastel purple"},
			{"x": 194, "y": 59, "z": 34, "label": "Dark pastel red"},
			{"x": 231, "y": 84, "z": 128, "label": "Dark pink"},
			{"x": 0, "y": 51, "z": 153, "label": "Dark powder blue"},
			{"x": 135, "y": 38, "z": 87, "label": "Dark raspberry"},
			{"x": 139, "y": 0, "z": 0, "label": "Dark red"},
			{"x": 233, "y": 150, "z": 122, "label": "Dark salmon"},
			{"x": 86, "y": 3, "z": 25, "label": "Dark scarlet"},
			{"x": 143, "y": 188, "z": 143, "label": "Dark sea green"},
			{"x": 60, "y": 20, "z": 20, "label": "Dark sienna"},
			{"x": 72, "y": 61, "z": 139, "label": "Dark slate blue"},
			{"x": 47, "y": 79, "z": 79, "label": "Dark slate gray"},
			{"x": 23, "y": 114, "z": 69, "label": "Dark spring green"},
			{"x": 145, "y": 129, "z": 81, "label": "Dark tan"},
			{"x": 255, "y": 168, "z": 18, "label": "Dark tangerine"},
			{"x": 72, "y": 60, "z": 50, "label": "Dark taupe"},
			{"x": 204, "y": 78, "z": 92, "label": "Dark terra cotta"},
			{"x": 0, "y": 206, "z": 209, "label": "Dark turquoise"},
			{"x": 148, "y": 0, "z": 211, "label": "Dark violet"},
			{"x": 0, "y": 105, "z": 62, "label": "Dartmouth green"},
			{"x": 85, "y": 85, "z": 85, "label": "Davy's grey"},
			{"x": 215, "y": 10, "z": 83, "label": "Debian red"},
			{"x": 169, "y": 32, "z": 62, "label": "Deep carmine"},
			{"x": 239, "y": 48, "z": 56, "label": "Deep carmine pink"},
			{"x": 233, "y": 105, "z": 44, "label": "Deep carrot orange"},
			{"x": 218, "y": 50, "z": 135, "label": "Deep cerise"},
			{"x": 250, "y": 214, "z": 165, "label": "Deep champagne"},
			{"x": 185, "y": 78, "z": 72, "label": "Deep chestnut"},
			{"x": 112, "y": 66, "z": 65, "label": "Deep coffee"},
			{"x": 193, "y": 84, "z": 193, "label": "Deep fuchsia"},
			{"x": 0, "y": 75, "z": 73, "label": "Deep jungle green"},
			{"x": 153, "y": 85, "z": 187, "label": "Deep lilac"},
			{"x": 204, "y": 0, "z": 204, "label": "Deep magenta"},
			{"x": 255, "y": 203, "z": 164, "label": "Deep peach"},
			{"x": 255, "y": 20, "z": 147, "label": "Deep pink"},
			{"x": 255, "y": 153, "z": 51, "label": "Deep saffron"},
			{"x": 0, "y": 191, "z": 255, "label": "Deep sky blue"},
			{"x": 21, "y": 96, "z": 189, "label": "Denim"},
			{"x": 193, "y": 154, "z": 107, "label": "Desert"},
			{"x": 237, "y": 201, "z": 175, "label": "Desert sand"},
			{"x": 105, "y": 105, "z": 105, "label": "Dim gray"},
			{"x": 30, "y": 144, "z": 255, "label": "Dodger blue"},
			{"x": 215, "y": 24, "z": 104, "label": "Dogwood rose"},
			{"x": 133, "y": 187, "z": 101, "label": "Dollar bill"},
			{"x": 150, "y": 113, "z": 23, "label": "Drab"},
			{"x": 0, "y": 0, "z": 156, "label": "Duke blue"},
			{"x": 225, "y": 169, "z": 95, "label": "Earth yellow"},
			{"x": 194, "y": 178, "z": 128, "label": "Ecru"},
			{"x": 97, "y": 64, "z": 81, "label": "Eggplant"},
			{"x": 240, "y": 234, "z": 214, "label": "Eggshell"},
			{"x": 16, "y": 52, "z": 166, "label": "Egyptian blue"},
			{"x": 125, "y": 249, "z": 255, "label": "Electric blue"},
			{"x": 255, "y": 0, "z": 63, "label": "Electric crimson"},
			{"x": 0, "y": 255, "z": 255, "label": "Electric cyan"},
			{"x": 0, "y": 255, "z": 0, "label": "Electric green"},
			{"x": 111, "y": 0, "z": 255, "label": "Electric indigo"},
			{"x": 244, "y": 187, "z": 255, "label": "Electric lavender"},
			{"x": 204, "y": 255, "z": 0, "label": "Electric lime"},
			{"x": 191, "y": 0, "z": 255, "label": "Electric purple"},
			{"x": 63, "y": 0, "z": 255, "label": "Electric ultramarine"},
			{"x": 143, "y": 0, "z": 255, "label": "Electric violet"},
			{"x": 255, "y": 255, "z": 0, "label": "Electric yellow"},
			{"x": 80, "y": 200, "z": 120, "label": "Emerald"},
			{"x": 150, "y": 200, "z": 162, "label": "Eton blue"},
			{"x": 193, "y": 154, "z": 107, "label": "Fallow"},
			{"x": 128, "y": 24, "z": 24, "label": "Falu red"},
			{"x": 181, "y": 51, "z": 137, "label": "Fandango"},
			{"x": 244, "y": 0, "z": 161, "label": "Fashion fuchsia"},
			{"x": 229, "y": 170, "z": 112, "label": "Fawn"},
			{"x": 77, "y": 93, "z": 83, "label": "Feldgrau"},
			{"x": 79, "y": 121, "z": 66, "label": "Fern green"},
			{"x": 255, "y": 40, "z": 0, "label": "Ferrari Red"},
			{"x": 108, "y": 84, "z": 30, "label": "Field drab"},
			{"x": 178, "y": 34, "z": 34, "label": "Firebrick"},
			{"x": 206, "y": 32, "z": 41, "label": "Fire engine red"},
			{"x": 226, "y": 88, "z": 34, "label": "Flame"},
			{"x": 252, "y": 142, "z": 172, "label": "Flamingo pink"},
			{"x": 247, "y": 233, "z": 142, "label": "Flavescent"},
			{"x": 238, "y": 220, "z": 130, "label": "Flax"},
			{"x": 255, "y": 250, "z": 240, "label": "Floral white"},
			{"x": 255, "y": 191, "z": 0, "label": "Fluorescent orange"},
			{"x": 255, "y": 20, "z": 147, "label": "Fluorescent pink"},
			{"x": 204, "y": 255, "z": 0, "label": "Fluorescent yellow"},
			{"x": 255, "y": 0, "z": 79, "label": "Folly"},
			{"x": 1, "y": 68, "z": 33, "label": "Forest green (traditional)"},
			{"x": 34, "y": 139, "z": 34, "label": "Forest green (web)"},
			{"x": 166, "y": 123, "z": 91, "label": "French beige"},
			{"x": 0, "y": 114, "z": 187, "label": "French blue"},
			{"x": 134, "y": 96, "z": 142, "label": "French lilac"},
			{"x": 246, "y": 74, "z": 138, "label": "French rose"},
			{"x": 255, "y": 0, "z": 255, "label": "Fuchsia"},
			{"x": 255, "y": 119, "z": 255, "label": "Fuchsia pink"},
			{"x": 228, "y": 132, "z": 0, "label": "Fulvous"},
			{"x": 204, "y": 102, "z": 102, "label": "Fuzzy Wuzzy"},
			{"x": 220, "y": 220, "z": 220, "label": "Gainsboro"},
			{"x": 228, "y": 155, "z": 15, "label": "Gamboge"},
			{"x": 248, "y": 248, "z": 255, "label": "Ghost white"},
			{"x": 176, "y": 101, "z": 0, "label": "Ginger"},
			{"x": 96, "y": 130, "z": 182, "label": "Glaucous"},
			{"x": 230, "y": 232, "z": 250, "label": "Glitter"},
			{"x": 212, "y": 175, "z": 55, "label": "Gold (metallic)"},
			{"x": 255, "y": 215, "z": 0, "label": "Gold (web) (Golden)"},
			{"x": 153, "y": 101, "z": 21, "label": "Golden brown"},
			{"x": 252, "y": 194, "z": 0, "label": "Golden poppy"},
			{"x": 255, "y": 223, "z": 0, "label": "Golden yellow"},
			{"x": 218, "y": 165, "z": 32, "label": "Goldenrod"},
			{"x": 168, "y": 228, "z": 160, "label": "Granny Smith Apple"},
			{"x": 128, "y": 128, "z": 128, "label": "Gray"},
			{"x": 127, "y": 127, "z": 127, "label": "Gray (HTML/CSS gray)"},
			{"x": 190, "y": 190, "z": 190, "label": "Gray (X11 gray)"},
			{"x": 70, "y": 89, "z": 69, "label": "Gray-asparagus"},
			{"x": 0, "y": 255, "z": 0, "label": "Green (color wheel) (X11 green)"},
			{"x": 0, "y": 128, "z": 0, "label": "Green (HTML/CSS green)"},
			{"x": 0, "y": 168, "z": 119, "label": "Green (Munsell)"},
			{"x": 0, "y": 159, "z": 107, "label": "Green (NCS)"},
			{"x": 0, "y": 165, "z": 80, "label": "Green (pigment)"},
			{"x": 102, "y": 176, "z": 50, "label": "Green (RYB)"},
			{"x": 173, "y": 255, "z": 47, "label": "Green-yellow"},
			{"x": 169, "y": 154, "z": 134, "label": "Grullo"},
			{"x": 0, "y": 255, "z": 127, "label": "Guppie green"},
			{"x": 102, "y": 56, "z": 84, "label": "Halaya ube"},
			{"x": 68, "y": 108, "z": 207, "label": "Han blue"},
			{"x": 82, "y": 24, "z": 250, "label": "Han purple"},
			{"x": 233, "y": 214, "z": 107, "label": "Hansa yellow"},
			{"x": 63, "y": 255, "z": 0, "label": "Harlequin"},
			{"x": 201, "y": 0, "z": 22, "label": "Harvard crimson"},
			{"x": 128, "y": 128, "z": 0, "label": "Heart Gold"},
			{"x": 244, "y": 0, "z": 161, "label": "Hollywood cerise"},
			{"x": 0, "y": 112, "z": 0, "label": "Hooker's green"},
			{"x": 255, "y": 105, "z": 180, "label": "Hot pink"},
			{"x": 252, "y": 247, "z": 94, "label": "Icterine"},
			{"x": 19, "y": 136, "z": 8, "label": "India green"},
			{"x": 227, "y": 168, "z": 87, "label": "Indian yellow"},
			{"x": 75, "y": 0, "z": 130, "label": "Indigo (web)"},
			{"x": 255, "y": 79, "z": 0, "label": "International orange"},
			{"x": 244, "y": 240, "z": 236, "label": "Isabelline"},
			{"x": 255, "y": 255, "z": 240, "label": "Ivory"},
			{"x": 248, "y": 222, "z": 126, "label": "Jasmine"},
			{"x": 165, "y": 11, "z": 94, "label": "Jazzberry jam"},
			{"x": 189, "y": 218, "z": 87, "label": "June bud"},
			{"x": 76, "y": 187, "z": 23, "label": "Kelly green"},
			{"x": 240, "y": 230, "z": 140, "label": "Khaki (X11) (Light khaki)"},
			{"x": 8, "y": 120, "z": 48, "label": "La Salle Green"},
			{"x": 38, "y": 97, "z": 156, "label": "Lapis lazuli"},
			{"x": 169, "y": 186, "z": 157, "label": "Laurel green"},
			{"x": 148, "y": 87, "z": 235, "label": "Lavender indigo"},
			{"x": 150, "y": 123, "z": 182, "label": "Lavender purple"},
			{"x": 124, "y": 252, "z": 0, "label": "Lawn green"},
			{"x": 255, "y": 247, "z": 0, "label": "Lemon"},
			{"x": 253, "y": 213, "z": 177, "label": "Light apricot"},
			{"x": 181, "y": 101, "z": 29, "label": "Light brown"},
			{"x": 230, "y": 103, "z": 113, "label": "Light carmine pink"},
			{"x": 240, "y": 128, "z": 128, "label": "Light coral"},
			{"x": 147, "y": 204, "z": 234, "label": "Light cornflower blue"},
			{"x": 245, "y": 105, "z": 145, "label": "Light Crimson"},
			{"x": 224, "y": 255, "z": 255, "label": "Light cyan"},
			{"x": 249, "y": 132, "z": 239, "label": "Light fuchsia pink"},
			{"x": 250, "y": 250, "z": 210, "label": "Light goldenrod yellow"},
			{"x": 211, "y": 211, "z": 211, "label": "Light gray"},
			{"x": 144, "y": 238, "z": 144, "label": "Light green"},
			{"x": 240, "y": 230, "z": 140, "label": "Light khaki"},
			{"x": 177, "y": 156, "z": 217, "label": "Light pastel purple"},
			{"x": 255, "y": 182, "z": 193, "label": "Light pink"},
			{"x": 255, "y": 160, "z": 122, "label": "Light salmon"},
			{"x": 255, "y": 153, "z": 153, "label": "Light salmon pink"},
			{"x": 32, "y": 178, "z": 170, "label": "Light sea green"},
			{"x": 135, "y": 206, "z": 250, "label": "Light sky blue"},
			{"x": 119, "y": 136, "z": 153, "label": "Light slate gray"},
			{"x": 179, "y": 139, "z": 109, "label": "Light taupe"},
			{"x": 230, "y": 143, "z": 172, "label": "Light Thulian pink"},
			{"x": 255, "y": 255, "z": 237, "label": "Light yellow"},
			{"x": 200, "y": 162, "z": 200, "label": "Lilac"},
			{"x": 191, "y": 255, "z": 0, "label": "Lime (color wheel)"},
			{"x": 0, "y": 255, "z": 0, "label": "Lime (web) (X11 green)"},
			{"x": 50, "y": 205, "z": 50, "label": "Lime green"},
			{"x": 25, "y": 89, "z": 5, "label": "Lincoln green"},
			{"x": 250, "y": 240, "z": 230, "label": "Linen"},
			{"x": 193, "y": 154, "z": 107, "label": "Lion"},
			{"x": 83, "y": 75, "z": 79, "label": "Liver"},
			{"x": 230, "y": 32, "z": 32, "label": "Lust"},
			{"x": 255, "y": 0, "z": 255, "label": "Magenta"},
			{"x": 202, "y": 31, "z": 123, "label": "Magenta (dye)"},
			{"x": 255, "y": 0, "z": 144, "label": "Magenta (process)"},
			{"x": 170, "y": 240, "z": 209, "label": "Magic mint"},
			{"x": 248, "y": 244, "z": 255, "label": "Magnolia"},
			{"x": 192, "y": 64, "z": 0, "label": "Mahogany"},
			{"x": 251, "y": 236, "z": 93, "label": "Maize"},
			{"x": 96, "y": 80, "z": 220, "label": "Majorelle Blue"},
			{"x": 11, "y": 218, "z": 81, "label": "Malachite"},
			{"x": 151, "y": 154, "z": 170, "label": "Manatee"},
			{"x": 255, "y": 130, "z": 67, "label": "Mango Tango"},
			{"x": 116, "y": 195, "z": 101, "label": "Mantis"},
			{"x": 128, "y": 0, "z": 0, "label": "Maroon (HTML/CSS)"},
			{"x": 176, "y": 48, "z": 96, "label": "Maroon (X11)"},
			{"x": 224, "y": 176, "z": 255, "label": "Mauve"},
			{"x": 145, "y": 95, "z": 109, "label": "Mauve taupe"},
			{"x": 239, "y": 152, "z": 170, "label": "Mauvelous"},
			{"x": 115, "y": 194, "z": 251, "label": "Maya blue"},
			{"x": 229, "y": 183, "z": 59, "label": "Meat brown"},
			{"x": 102, "y": 221, "z": 170, "label": "Medium aquamarine"},
			{"x": 0, "y": 0, "z": 205, "label": "Medium blue"},
			{"x": 226, "y": 6, "z": 44, "label": "Medium candy apple red"},
			{"x": 175, "y": 64, "z": 53, "label": "Medium carmine"},
			{"x": 243, "y": 229, "z": 171, "label": "Medium champagne"},
			{"x": 3, "y": 80, "z": 150, "label": "Medium electric blue"},
			{"x": 28, "y": 53, "z": 45, "label": "Medium jungle green"},
			{"x": 221, "y": 160, "z": 221, "label": "Medium lavender magenta"},
			{"x": 186, "y": 85, "z": 211, "label": "Medium orchid"},
			{"x": 0, "y": 103, "z": 165, "label": "Medium Persian blue"},
			{"x": 147, "y": 112, "z": 219, "label": "Medium purple"},
			{"x": 187, "y": 51, "z": 133, "label": "Medium red-violet"},
			{"x": 60, "y": 179, "z": 113, "label": "Medium sea green"},
			{"x": 123, "y": 104, "z": 238, "label": "Medium slate blue"},
			{"x": 201, "y": 220, "z": 135, "label": "Medium spring bud"},
			{"x": 0, "y": 250, "z": 154, "label": "Medium spring green"},
			{"x": 103, "y": 76, "z": 71, "label": "Medium taupe"},
			{"x": 0, "y": 84, "z": 180, "label": "Medium teal blue"},
			{"x": 72, "y": 209, "z": 204, "label": "Medium turquoise"},
			{"x": 199, "y": 21, "z": 133, "label": "Medium violet-red"},
			{"x": 253, "y": 188, "z": 180, "label": "Melon"},
			{"x": 25, "y": 25, "z": 112, "label": "Midnight blue"},
			{"x": 0, "y": 73, "z": 83, "label": "Midnight green (eagle green)"},
			{"x": 255, "y": 196, "z": 12, "label": "Mikado yellow"},
			{"x": 62, "y": 180, "z": 137, "label": "Mint"},
			{"x": 245, "y": 255, "z": 250, "label": "Mint cream"},
			{"x": 152, "y": 255, "z": 152, "label": "Mint green"},
			{"x": 255, "y": 228, "z": 225, "label": "Misty rose"},
			{"x": 250, "y": 235, "z": 215, "label": "Moccasin"},
			{"x": 150, "y": 113, "z": 23, "label": "Mode beige"},
			{"x": 115, "y": 169, "z": 194, "label": "Moonstone blue"},
			{"x": 174, "y": 12, "z": 0, "label": "Mordant red 19"},
			{"x": 173, "y": 223, "z": 173, "label": "Moss green"},
			{"x": 48, "y": 186, "z": 143, "label": "Mountain Meadow"},
			{"x": 153, "y": 122, "z": 141, "label": "Mountbatten pink"},
			{"x": 197, "y": 75, "z": 140, "label": "Mulberry"},
			{"x": 242, "y": 243, "z": 244, "label": "Munsell"},
			{"x": 255, "y": 219, "z": 88, "label": "Mustard"},
			{"x": 33, "y": 66, "z": 30, "label": "Myrtle"},
			{"x": 24, "y": 69, "z": 59, "label": "MSU Green"},
			{"x": 246, "y": 173, "z": 198, "label": "Nadeshiko pink"},
			{"x": 42, "y": 128, "z": 0, "label": "Napier green"},
			{"x": 250, "y": 218, "z": 94, "label": "Naples yellow"},
			{"x": 255, "y": 222, "z": 173, "label": "Navajo white"},
			{"x": 0, "y": 0, "z": 128, "label": "Navy blue"},
			{"x": 255, "y": 163, "z": 67, "label": "Neon Carrot"},
			{"x": 254, "y": 89, "z": 194, "label": "Neon fuchsia"},
			{"x": 57, "y": 255, "z": 20, "label": "Neon green"},
			{"x": 164, "y": 221, "z": 237, "label": "Non-photo blue"},
			{"x": 5, "y": 144, "z": 51, "label": "North Texas Green"},
			{"x": 0, "y": 119, "z": 190, "label": "Ocean Boat Blue"},
			{"x": 204, "y": 119, "z": 34, "label": "Ochre"},
			{"x": 0, "y": 128, "z": 0, "label": "Office green"},
			{"x": 207, "y": 181, "z": 59, "label": "Old gold"},
			{"x": 253, "y": 245, "z": 230, "label": "Old lace"},
			{"x": 121, "y": 104, "z": 120, "label": "Old lavender"},
			{"x": 103, "y": 49, "z": 71, "label": "Old mauve"},
			{"x": 192, "y": 128, "z": 129, "label": "Old rose"},
			{"x": 128, "y": 128, "z": 0, "label": "Olive"},
			{"x": 107, "y": 142, "z": 35, "label": "Olive Drab (web) (Olive Drab #3)"},
			{"x": 60, "y": 52, "z": 31, "label": "Olive Drab #7"},
			{"x": 154, "y": 185, "z": 115, "label": "Olivine"},
			{"x": 15, "y": 15, "z": 15, "label": "Onyx"},
			{"x": 183, "y": 132, "z": 167, "label": "Opera mauve"},
			{"x": 255, "y": 127, "z": 0, "label": "Orange (color wheel)"},
			{"x": 251, "y": 153, "z": 2, "label": "Orange (RYB)"},
			{"x": 255, "y": 165, "z": 0, "label": "Orange (web color)"},
			{"x": 255, "y": 159, "z": 0, "label": "Orange peel"},
			{"x": 255, "y": 69, "z": 0, "label": "Orange-red"},
			{"x": 218, "y": 112, "z": 214, "label": "Orchid"},
			{"x": 101, "y": 67, "z": 33, "label": "Otter brown"},
			{"x": 65, "y": 74, "z": 76, "label": "Outer Space"},
			{"x": 255, "y": 110, "z": 74, "label": "Outrageous Orange"},
			{"x": 0, "y": 33, "z": 71, "label": "Oxford Blue"},
			{"x": 153, "y": 0, "z": 0, "label": "OU Crimson Red"},
			{"x": 0, "y": 102, "z": 0, "label": "Pakistan green"},
			{"x": 39, "y": 59, "z": 226, "label": "Palatinate blue"},
			{"x": 104, "y": 40, "z": 96, "label": "Palatinate purple"},
			{"x": 188, "y": 212, "z": 230, "label": "Pale aqua"},
			{"x": 175, "y": 238, "z": 238, "label": "Pale blue"},
			{"x": 152, "y": 118, "z": 84, "label": "Pale brown"},
			{"x": 175, "y": 64, "z": 53, "label": "Pale carmine"},
			{"x": 155, "y": 196, "z": 226, "label": "Pale cerulean"},
			{"x": 221, "y": 173, "z": 175, "label": "Pale chestnut"},
			{"x": 218, "y": 138, "z": 103, "label": "Pale copper"},
			{"x": 171, "y": 205, "z": 239, "label": "Pale cornflower blue"},
			{"x": 230, "y": 190, "z": 138, "label": "Pale gold"},
			{"x": 238, "y": 232, "z": 170, "label": "Pale goldenrod"},
			{"x": 152, "y": 251, "z": 152, "label": "Pale green"},
			{"x": 220, "y": 208, "z": 255, "label": "Pale lavender"},
			{"x": 249, "y": 132, "z": 229, "label": "Pale magenta"},
			{"x": 250, "y": 218, "z": 221, "label": "Pale pink"},
			{"x": 221, "y": 160, "z": 221, "label": "Pale plum"},
			{"x": 219, "y": 112, "z": 147, "label": "Pale red-violet"},
			{"x": 150, "y": 222, "z": 209, "label": "Pale robin egg blue"},
			{"x": 201, "y": 192, "z": 187, "label": "Pale silver"},
			{"x": 236, "y": 235, "z": 189, "label": "Pale spring bud"},
			{"x": 188, "y": 152, "z": 126, "label": "Pale taupe"},
			{"x": 219, "y": 112, "z": 147, "label": "Pale violet-red"},
			{"x": 120, "y": 24, "z": 74, "label": "Pansy purple"},
			{"x": 255, "y": 239, "z": 213, "label": "Papaya whip"},
			{"x": 80, "y": 200, "z": 120, "label": "Paris Green"},
			{"x": 174, "y": 198, "z": 207, "label": "Pastel blue"},
			{"x": 131, "y": 105, "z": 83, "label": "Pastel brown"},
			{"x": 207, "y": 207, "z": 196, "label": "Pastel gray"},
			{"x": 119, "y": 221, "z": 119, "label": "Pastel green"},
			{"x": 244, "y": 154, "z": 194, "label": "Pastel magenta"},
			{"x": 255, "y": 179, "z": 71, "label": "Pastel orange"},
			{"x": 255, "y": 209, "z": 220, "label": "Pastel pink"},
			{"x": 179, "y": 158, "z": 181, "label": "Pastel purple"},
			{"x": 255, "y": 105, "z": 97, "label": "Pastel red"},
			{"x": 203, "y": 153, "z": 201, "label": "Pastel violet"},
			{"x": 253, "y": 253, "z": 150, "label": "Pastel yellow"},
			{"x": 128, "y": 0, "z": 128, "label": "Patriarch"},
			{"x": 64, "y": 64, "z": 79, "label": "Payne's grey"},
			{"x": 255, "y": 229, "z": 180, "label": "Peach"},
			{"x": 255, "y": 204, "z": 153, "label": "Peach-orange"},
			{"x": 255, "y": 218, "z": 185, "label": "Peach puff"},
			{"x": 250, "y": 223, "z": 173, "label": "Peach-yellow"},
			{"x": 209, "y": 226, "z": 49, "label": "Pear"},
			{"x": 234, "y": 224, "z": 200, "label": "Pearl"},
			{"x": 136, "y": 216, "z": 192, "label": "Pearl Aqua"},
			{"x": 230, "y": 226, "z": 0, "label": "Peridot"},
			{"x": 204, "y": 204, "z": 255, "label": "Periwinkle"},
			{"x": 28, "y": 57, "z": 187, "label": "Persian blue"},
			{"x": 0, "y": 166, "z": 147, "label": "Persian green"},
			{"x": 50, "y": 18, "z": 122, "label": "Persian indigo"},
			{"x": 217, "y": 144, "z": 88, "label": "Persian orange"},
			{"x": 247, "y": 127, "z": 190, "label": "Persian pink"},
			{"x": 112, "y": 28, "z": 28, "label": "Persian plum"},
			{"x": 204, "y": 51, "z": 51, "label": "Persian red"},
			{"x": 254, "y": 40, "z": 162, "label": "Persian rose"},
			{"x": 223, "y": 0, "z": 255, "label": "Phlox"},
			{"x": 0, "y": 15, "z": 137, "label": "Phthalo blue"},
			{"x": 18, "y": 53, "z": 36, "label": "Phthalo green"},
			{"x": 253, "y": 221, "z": 230, "label": "Piggy pink"},
			{"x": 1, "y": 121, "z": 111, "label": "Pine green"},
			{"x": 255, "y": 192, "z": 203, "label": "Pink"},
			{"x": 255, "y": 153, "z": 102, "label": "Pink-orange"},
			{"x": 231, "y": 172, "z": 207, "label": "Pink pearl"},
			{"x": 247, "y": 143, "z": 167, "label": "Pink Sherbet"},
			{"x": 147, "y": 197, "z": 114, "label": "Pistachio"},
			{"x": 229, "y": 228, "z": 226, "label": "Platinum"},
			{"x": 142, "y": 69, "z": 133, "label": "Plum (traditional)"},
			{"x": 221, "y": 160, "z": 221, "label": "Plum (web)"},
			{"x": 255, "y": 90, "z": 54, "label": "Portland Orange"},
			{"x": 176, "y": 224, "z": 230, "label": "Powder blue (web)"},
			{"x": 255, "y": 143, "z": 0, "label": "Princeton orange"},
			{"x": 112, "y": 28, "z": 28, "label": "Prune"},
			{"x": 0, "y": 49, "z": 83, "label": "Prussian blue"},
			{"x": 223, "y": 0, "z": 255, "label": "Psychedelic purple"},
			{"x": 204, "y": 136, "z": 153, "label": "Puce"},
			{"x": 255, "y": 117, "z": 24, "label": "Pumpkin"},
			{"x": 128, "y": 0, "z": 128, "label": "Purple (HTML/CSS)"},
			{"x": 159, "y": 0, "z": 197, "label": "Purple (Munsell)"},
			{"x": 160, "y": 32, "z": 240, "label": "Purple (X11)"},
			{"x": 105, "y": 53, "z": 156, "label": "Purple Heart"},
			{"x": 150, "y": 120, "z": 182, "label": "Purple mountain majesty"},
			{"x": 254, "y": 78, "z": 218, "label": "Purple pizzazz"},
			{"x": 80, "y": 64, "z": 77, "label": "Purple taupe"},
			{"x": 81, "y": 72, "z": 79, "label": "Quartz"},
			{"x": 255, "y": 53, "z": 94, "label": "Radical Red"},
			{"x": 227, "y": 11, "z": 93, "label": "Raspberry"},
			{"x": 145, "y": 95, "z": 109, "label": "Raspberry glace"},
			{"x": 226, "y": 80, "z": 152, "label": "Raspberry pink"},
			{"x": 179, "y": 68, "z": 108, "label": "Raspberry rose"},
			{"x": 130, "y": 102, "z": 68, "label": "Raw umber"},
			{"x": 255, "y": 51, "z": 204, "label": "Razzle dazzle rose"},
			{"x": 227, "y": 37, "z": 107, "label": "Razzmatazz"},
			{"x": 255, "y": 0, "z": 0, "label": "Red"},
			{"x": 242, "y": 0, "z": 60, "label": "Red (Munsell)"},
			{"x": 196, "y": 2, "z": 51, "label": "Red (NCS)"},
			{"x": 237, "y": 28, "z": 36, "label": "Red (pigment)"},
			{"x": 254, "y": 39, "z": 18, "label": "Red (RYB)"},
			{"x": 165, "y": 42, "z": 42, "label": "Red-brown"},
			{"x": 199, "y": 21, "z": 133, "label": "Red-violet"},
			{"x": 171, "y": 78, "z": 82, "label": "Redwood"},
			{"x": 0, "y": 64, "z": 64, "label": "Rich black"},
			{"x": 241, "y": 167, "z": 254, "label": "Rich brilliant lavender"},
			{"x": 215, "y": 0, "z": 64, "label": "Rich carmine"},
			{"x": 8, "y": 146, "z": 208, "label": "Rich electric blue"},
			{"x": 167, "y": 107, "z": 207, "label": "Rich lavender"},
			{"x": 182, "y": 102, "z": 210, "label": "Rich lilac"},
			{"x": 176, "y": 48, "z": 96, "label": "Rich maroon"},
			{"x": 65, "y": 72, "z": 51, "label": "Rifle green"},
			{"x": 0, "y": 204, "z": 204, "label": "Robin egg blue"},
			{"x": 255, "y": 0, "z": 127, "label": "Rose"},
			{"x": 249, "y": 66, "z": 158, "label": "Rose bonbon"},
			{"x": 103, "y": 72, "z": 70, "label": "Rose ebony"},
			{"x": 183, "y": 110, "z": 121, "label": "Rose gold"},
			{"x": 227, "y": 38, "z": 54, "label": "Rose madder"},
			{"x": 255, "y": 102, "z": 204, "label": "Rose pink"},
			{"x": 170, "y": 152, "z": 169, "label": "Rose quartz"},
			{"x": 144, "y": 93, "z": 93, "label": "Rose taupe"},
			{"x": 171, "y": 78, "z": 82, "label": "Rose vale"},
			{"x": 101, "y": 0, "z": 11, "label": "Rosewood"},
			{"x": 212, "y": 0, "z": 0, "label": "Rosso corsa"},
			{"x": 188, "y": 143, "z": 143, "label": "Rosy brown"},
			{"x": 0, "y": 56, "z": 168, "label": "Royal azure"},
			{"x": 0, "y": 35, "z": 102, "label": "Royal blue (traditional)"},
			{"x": 65, "y": 105, "z": 225, "label": "Royal blue (web)"},
			{"x": 202, "y": 44, "z": 146, "label": "Royal fuchsia"},
			{"x": 120, "y": 81, "z": 169, "label": "Royal purple"},
			{"x": 224, "y": 17, "z": 95, "label": "Ruby"},
			{"x": 255, "y": 0, "z": 40, "label": "Ruddy"},
			{"x": 187, "y": 101, "z": 40, "label": "Ruddy brown"},
			{"x": 225, "y": 142, "z": 150, "label": "Ruddy pink"},
			{"x": 168, "y": 28, "z": 7, "label": "Rufous"},
			{"x": 128, "y": 70, "z": 27, "label": "Russet"},
			{"x": 183, "y": 65, "z": 14, "label": "Rust"},
			{"x": 0, "y": 86, "z": 63, "label": "Sacramento State green"},
			{"x": 139, "y": 69, "z": 19, "label": "Saddle brown"},
			{"x": 255, "y": 103, "z": 0, "label": "Safety orange (blaze orange)"},
			{"x": 244, "y": 196, "z": 48, "label": "Saffron"},
			{"x": 35, "y": 41, "z": 122, "label": "St. Patrick's blue"},
			{"x": 255, "y": 140, "z": 105, "label": "Salmon"},
			{"x": 255, "y": 145, "z": 164, "label": "Salmon pink"},
			{"x": 194, "y": 178, "z": 128, "label": "Sand"},
			{"x": 150, "y": 113, "z": 23, "label": "Sand dune"},
			{"x": 236, "y": 213, "z": 64, "label": "Sandstorm"},
			{"x": 244, "y": 164, "z": 96, "label": "Sandy brown"},
			{"x": 150, "y": 113, "z": 23, "label": "Sandy taupe"},
			{"x": 80, "y": 125, "z": 42, "label": "Sap green"},
			{"x": 15, "y": 82, "z": 186, "label": "Sapphire"},
			{"x": 203, "y": 161, "z": 53, "label": "Satin sheen gold"},
			{"x": 255, "y": 36, "z": 0, "label": "Scarlet"},
			{"x": 255, "y": 36, "z": 0, "label": "Scarlet (Crayola)"},
			{"x": 255, "y": 216, "z": 0, "label": "School bus yellow"},
			{"x": 118, "y": 255, "z": 122, "label": "Screamin' Green"},
			{"x": 46, "y": 139, "z": 87, "label": "Sea green"},
			{"x": 50, "y": 20, "z": 20, "label": "Seal brown"},
			{"x": 255, "y": 245, "z": 238, "label": "Seashell"},
			{"x": 255, "y": 186, "z": 0, "label": "Selective yellow"},
			{"x": 112, "y": 66, "z": 20, "label": "Sepia"},
			{"x": 138, "y": 121, "z": 93, "label": "Shadow"},
			{"x": 0, "y": 158, "z": 96, "label": "Shamrock green"},
			{"x": 252, "y": 15, "z": 192, "label": "Shocking pink"},
			{"x": 136, "y": 45, "z": 23, "label": "Sienna"},
			{"x": 192, "y": 192, "z": 192, "label": "Silver"},
			{"x": 203, "y": 65, "z": 11, "label": "Sinopia"},
			{"x": 0, "y": 116, "z": 116, "label": "Skobeloff"},
			{"x": 135, "y": 206, "z": 235, "label": "Sky blue"},
			{"x": 207, "y": 113, "z": 175, "label": "Sky magenta"},
			{"x": 106, "y": 90, "z": 205, "label": "Slate blue"},
			{"x": 112, "y": 128, "z": 144, "label": "Slate gray"},
			{"x": 0, "y": 51, "z": 153, "label": "Smalt (Dark powder blue)"},
			{"x": 147, "y": 61, "z": 65, "label": "Smokey topaz"},
			{"x": 16, "y": 12, "z": 8, "label": "Smoky black"},
			{"x": 255, "y": 250, "z": 250, "label": "Snow"},
			{"x": 15, "y": 192, "z": 252, "label": "Spiro Disco Ball"},
			{"x": 254, "y": 253, "z": 255, "label": "Splashed white"},
			{"x": 167, "y": 252, "z": 0, "label": "Spring bud"},
			{"x": 0, "y": 255, "z": 127, "label": "Spring green"},
			{"x": 70, "y": 130, "z": 180, "label": "Steel blue"},
			{"x": 250, "y": 218, "z": 94, "label": "Stil de grain yellow"},
			{"x": 153, "y": 0, "z": 0, "label": "Stizza"},
			{"x": 228, "y": 217, "z": 111, "label": "Straw"},
			{"x": 255, "y": 204, "z": 51, "label": "Sunglow"},
			{"x": 250, "y": 214, "z": 165, "label": "Sunset"},
			{"x": 210, "y": 180, "z": 140, "label": "Tan"},
			{"x": 249, "y": 77, "z": 0, "label": "Tangelo"},
			{"x": 242, "y": 133, "z": 0, "label": "Tangerine"},
			{"x": 255, "y": 204, "z": 0, "label": "Tangerine yellow"},
			{"x": 72, "y": 60, "z": 50, "label": "Taupe"},
			{"x": 139, "y": 133, "z": 137, "label": "Taupe gray"},
			{"x": 208, "y": 240, "z": 192, "label": "Tea green"},
			{"x": 248, "y": 131, "z": 121, "label": "Tea rose (orange)"},
			{"x": 244, "y": 194, "z": 194, "label": "Tea rose (rose)"},
			{"x": 0, "y": 128, "z": 128, "label": "Teal"},
			{"x": 54, "y": 117, "z": 136, "label": "Teal blue"},
			{"x": 0, "y": 109, "z": 91, "label": "Teal green"},
			{"x": 205, "y": 87, "z": 0, "label": "Tenné (Tawny)"},
			{"x": 226, "y": 114, "z": 91, "label": "Terra cotta"},
			{"x": 216, "y": 191, "z": 216, "label": "Thistle"},
			{"x": 222, "y": 111, "z": 161, "label": "Thulian pink"},
			{"x": 252, "y": 137, "z": 172, "label": "Tickle Me Pink"},
			{"x": 10, "y": 186, "z": 181, "label": "Tiffany Blue"},
			{"x": 224, "y": 141, "z": 60, "label": "Tiger's eye"},
			{"x": 219, "y": 215, "z": 210, "label": "Timberwolf"},
			{"x": 238, "y": 230, "z": 0, "label": "Titanium yellow"},
			{"x": 255, "y": 99, "z": 71, "label": "Tomato"},
			{"x": 116, "y": 108, "z": 192, "label": "Toolbox"},
			{"x": 255, "y": 200, "z": 124, "label": "Topaz"},
			{"x": 253, "y": 14, "z": 53, "label": "Tractor red"},
			{"x": 128, "y": 128, "z": 128, "label": "Trolley Grey"},
			{"x": 0, "y": 117, "z": 94, "label": "Tropical rain forest"},
			{"x": 0, "y": 115, "z": 207, "label": "True Blue"},
			{"x": 65, "y": 125, "z": 193, "label": "Tufts Blue"},
			{"x": 222, "y": 170, "z": 136, "label": "Tumbleweed"},
			{"x": 181, "y": 114, "z": 129, "label": "Turkish rose"},
			{"x": 48, "y": 213, "z": 200, "label": "Turquoise"},
			{"x": 0, "y": 255, "z": 239, "label": "Turquoise blue"},
			{"x": 160, "y": 214, "z": 180, "label": "Turquoise green"},
			{"x": 102, "y": 66, "z": 77, "label": "Tuscan red"},
			{"x": 138, "y": 73, "z": 107, "label": "Twilight lavender"},
			{"x": 102, "y": 2, "z": 60, "label": "Tyrian purple"},
			{"x": 0, "y": 51, "z": 170, "label": "UA blue"},
			{"x": 217, "y": 0, "z": 76, "label": "UA red"},
			{"x": 136, "y": 120, "z": 195, "label": "Ube"},
			{"x": 83, "y": 104, "z": 149, "label": "UCLA Blue"},
			{"x": 255, "y": 179, "z": 0, "label": "UCLA Gold"},
			{"x": 60, "y": 208, "z": 112, "label": "UFO Green"},
			{"x": 18, "y": 10, "z": 143, "label": "Ultramarine"},
			{"x": 65, "y": 102, "z": 245, "label": "Ultramarine blue"},
			{"x": 255, "y": 111, "z": 255, "label": "Ultra pink"},
			{"x": 99, "y": 81, "z": 71, "label": "Umber"},
			{"x": 197, "y": 179, "z": 88, "label": "Vegas gold"},
			{"x": 200, "y": 8, "z": 21, "label": "Venetian red"},
			{"x": 67, "y": 179, "z": 174, "label": "Verdigris"},
			{"x": 227, "y": 66, "z": 52, "label": "Vermilion"},
			{"x": 160, "y": 32, "z": 240, "label": "Veronica"},
			{"x": 143, "y": 0, "z": 255, "label": "Violet"},
			{"x": 64, "y": 130, "z": 109, "label": "Viridian"},
			{"x": 0, "y": 66, "z": 66, "label": "Warm black"},
			{"x": 100, "y": 84, "z": 82, "label": "Wenge"},
			{"x": 245, "y": 222, "z": 179, "label": "Wheat"},
			{"x": 255, "y": 255, "z": 255, "label": "White"},
			{"x": 245, "y": 245, "z": 245, "label": "White smoke"},
			{"x": 162, "y": 173, "z": 208, "label": "Wild blue yonder"},
			{"x": 255, "y": 67, "z": 164, "label": "Wild Strawberry"},
			{"x": 252, "y": 108, "z": 133, "label": "Wild Watermelon"},
			{"x": 114, "y": 47, "z": 55, "label": "Wine"},
			{"x": 201, "y": 160, "z": 220, "label": "Wisteria"},
			{"x": 115, "y": 134, "z": 120, "label": "Xanadu"},
			{"x": 15, "y": 77, "z": 146, "label": "Yale Blue"},
			{"x": 255, "y": 255, "z": 0, "label": "Yellow"},
			{"x": 154, "y": 205, "z": 50, "label": "Yellow-green"},
			{"x": 44, "y": 22, "z": 8, "label": "Zinnwaldite brown"}];
	};

	ColorClassifier.prototype = {
		learn: function (data) {
			this.data = data;
		},
		classify: function (triplet) {
			var point = rgb_from_hex(triplet);
			var min = Infinity;
			var min_idx = -1;
			var i, dist;
			for (i = 0; i < this.data.length; ++i) {
				dist = point.dist(this.data[i]);
				if (dist < min) {
					min = dist;
					min_idx = i;
				}
			}
			this.last_result = min_idx;
			return this.data[min_idx].label;
		},
		get_closest_color_hex: function (triplet) {
			var p = this.data[this.last_result];
			var val = p.x * (256 * 256) + p.y * 256 + p.z;
			var str = val.toString(16);
			while (str.length < 6)
				str = "0" + str;
			return "#" + str;
		}
	};

	function VectorConversionViewModel(params) {
		var self = this;

		self.loginState = params[0];
		self.settings = params[1];
		self.state = params[2];
		self.workingArea = params[3];
		self.files = params[4];

		self.target = undefined;
		self.file = undefined;
		self.data = undefined;
		self.slicing_progress = ko.observable(0);
		self.slicing_in_progress = ko.observable(false);

		self.title = ko.observable(undefined);
		self.slicer = ko.observable();
		self.slicers = ko.observableArray();
		self.profile = ko.observable();
		self.profiles = ko.observableArray();
		self.defaultSlicer = undefined;
		self.defaultProfile = undefined;
		
		// expert settings
		self.showHints = ko.observable(false);
		self.showExpertSettings = ko.observable(false);
		self.gcodeFilename = ko.observable();
		self.pierceTime = ko.observable(0);

		// vector settings
		self.show_vector_parameters = ko.observable(true);
		self.laserIntensity = ko.observable(undefined);
		self.laserSpeed = ko.observable(undefined);
		self.maxSpeed = ko.observable(3000);
		self.minSpeed = ko.observable(20);
		self.fill_areas = ko.observable(false);
		self.set_passes = ko.observable(1);
		self.cut_outlines = ko.observable(true);
		self.show_fill_areas_checkbox = ko.observable(false);


		// material menu
		//TODO make not hardcoded
		//[laserInt,speed,engraveWhite,engraveBlack,speedWhite,speedBlack]
		self.materials_settings = {
			'default':[0, 0, 0, 0, 0, 0],
//			'Acrylic':[1000,80,0,350,4500,850],
			'Foam Rubber':[625, 400, 0, 200, 3000, 1000],
			'Felt engrave':[300, 1000, 0, 300, 2000, 1000],
			'Felt cut':[1000, 1000, 0, 300, 2000, 1000],
			'Jeans Fabric':[1000,500,0,200,3000,500], // 2 passes todo check engraving
			'Grey cardboard':[1000,500,0,300,3000,750], // 2-3 passes
			'Cardboard':[1000,300,0,300,3000,750], // 2-3 passes
			'Kraftplex engrave':[400, 850, 0, 500, 3000, 850],
			'Kraftplex cut':[1000, 100, 0, 500, 3000, 850], //1-2 pass
			'Wood engrave':[350, 850, 0, 350, 3000, 850],
			'Wood cut':[1000, 250, 0, 350, 3000, 850],
			'Balsa cut':[700, 500, 0, 350, 3000, 850] //2 passes
		};

		var material_keys = [];

		for(var colHex in self.materials_settings){
			material_keys.push(colHex);
		}

//		MATERIALS OVERVIEW
//		self.material_objects = [
//			{ name: 'wood', settings : [1000, 250, 0, 350, 4500, 850]},
//			{ name: 'foam', settings : [625, 400, 0, 200, 3000, 1000]},
//			{ name: 'default', settings : [0, 0, 0, 0, 0, 0]}
//		];
////		self.material_forEach = ko.observableArray(self.material_objects);
//		self.printTest = function() {
//			console.log("CLICK CLICK CLICK");
//		};

		self.material_menu = ko.observableArray(material_keys);
		self.selected_material = ko.observable();
		self.old_material = 'default';

		// color settings
		self.colorNamer = new ColorClassifier();
		self.name_toHex = {};
		self.old_color = '';
		self.color_menu = ko.observableArray(self.color_keys);
		self.selected_color = ko.observable();
		self.showColorSettings = ko.observable(false); //todo check if multiple colors found
		self.color_keys = [];
		self.color_settings = {};
		self.color_key_update = function(){
			self.color_keys = [];
			console.log("color keys update");
			for(var colHex in self.workingArea.colorsFound){
				if (colHex !== undefined) {
					var name = self.colorNamer.classify(colHex);
					if (self.name_toHex[name] === undefined){
						self.name_toHex[name] = colHex;
					}
					self.color_keys.push(name);
				}
			}
			self.color_menu(self.color_keys);
		};



		// image engraving stuff
		// preset values are a good start for wood engraving
		self.images_placed = ko.observable(false);
		self.text_placed = ko.observable(false);
		self.show_image_parameters = ko.computed(function(){
			return (self.images_placed() || self.text_placed()
					|| (self.fill_areas() && self.show_vector_parameters()));
		});
		self.imgIntensityWhite = ko.observable(0);
		self.imgIntensityBlack = ko.observable(500);
		self.imgFeedrateWhite = ko.observable(1500); 
		self.imgFeedrateBlack = ko.observable(250);
		self.imgDithering = ko.observable(false);
		self.imgSharpening = ko.observable(1);
		self.imgContrast = ko.observable(1);
		self.beamDiameter = ko.observable(0.15);
		
		self.sharpeningMax = 25;
		self.contrastMax = 2;

		self.reset_cutOutlines = ko.computed(function(){
			if(!self.fill_areas()){
				self.cut_outlines(true);
			}
		}, self);

		// preprocessing preview ... returns opacity 0.0 - 1.0
		self.sharpenedPreview = ko.computed(function(){
			if(self.imgDithering()) return 0;
			else {
				var sharpeningPercents = (self.imgSharpening() - 1)/(self.sharpeningMax - 1);
				var contrastPercents = (self.imgContrast() - 1)/(self.contrastMax - 1);
				return sharpeningPercents - contrastPercents/2;
			}
		}, self);
		self.contrastPreview = ko.computed(function(){
			if(self.imgDithering()) return 0;
			else {
				var sharpeningPercents = (self.imgSharpening() - 1)/(self.sharpeningMax - 1);
				var contrastPercents = (self.imgContrast() - 1)/(self.contrastMax - 1);
				return contrastPercents - sharpeningPercents/2;
			}
		}, self);
		

		self.maxSpeed.subscribe(function(val){
			self._configureFeedrateSlider();
		});

		// shows conversion dialog and extracts svg first
		self.show_conversion_dialog = function() {
			self.gcodeFilesToAppend = self.workingArea.getPlacedGcodes();
			self.show_vector_parameters(self.workingArea.getPlacedSvgs().length > 0);
			self.show_fill_areas_checkbox(self.workingArea.hasFilledVectors());
			self.images_placed(self.workingArea.getPlacedImages().length > 0);
			self.text_placed(self.workingArea.hasTextItems());
			if(Object.keys(self.workingArea.colorsFound).length > 1){
				self.showColorSettings(true);
			}
				self.color_key_update();
			//self.show_image_parameters(self.workingArea.getPlacedImages().length > 0);

			if(self.show_vector_parameters() || self.show_image_parameters()){
				if(self.laserIntensity() === undefined){
					var intensity = self.settings.settings.plugins.mrbeam.defaultIntensity();
					self.laserIntensity(intensity);
				} 
				if(self.laserSpeed() === undefined){
					var speed = self.settings.settings.plugins.mrbeam.defaultFeedrate();
					self.laserSpeed(speed);
				}

				var gcodeFile = self.create_gcode_filename(self.workingArea.placedDesigns());
				self.gcodeFilename(gcodeFile);

				self.title(gettext("Converting"));
				$("#dialog_vector_graphics_conversion").modal("show"); // calls self.convert() afterwards
			} else {
				// just gcodes were placed. Start lasering right away.
				self.convert();
			}
		};
		
		self.cancel_conversion = function(){
			if(self.slicing_in_progress()){
				// TODO cancel slicing at the backend properly
				self.slicing_in_progress(false);
			}
		};

		self.create_gcode_filename = function(placedDesigns){
			if(placedDesigns.length > 0){
				var filemap = {};
				for(var idx in placedDesigns){
					var design = placedDesigns[idx];
					var end = design.name.lastIndexOf('.');
					var name = design.name.substring(0, end);
					if(filemap[name] !== undefined) filemap[name] += 1;
					else filemap[name] = 1;
				}
				var mostPlaced;
				var placed = 0;
				for(var name in filemap){
					if(filemap[name] > placed){
						mostPlaced = name;
						placed = filemap[name];
					}
				}
				var uniqueDesigns = Object.keys(filemap).length;
				var gcode_name = mostPlaced;
				if(placed > 1) gcode_name += "." + placed + "x";
				if(uniqueDesigns > 1){
					gcode_name += "_"+(uniqueDesigns-1)+"more";
				}
				
				return gcode_name;
			} else { 
				console.error("no designs placed.");
				return;
			}
		};

		self.on_change_material_color = ko.computed(function(){
			var new_material = self.selected_material();
			var new_color = self.selected_color();
			if(new_material === undefined || new_color === undefined){return;}

			var material_changed = self.old_material != new_material;
			var color_changed = self.old_color != new_color;
			console.log(material_changed,color_changed);
			console.log('Color',self.old_color,new_color);
			console.log('Material',self.old_material,new_material);


			if(color_changed){
				// color settings alleine übernommen werden
				if(self.color_settings[new_color] === undefined){
					self.color_settings[new_color] = self.get_current_settings(new_material);
				}else{
					self.color_settings[self.old_color] = self.get_current_settings(self.old_material);
					console.log('Apply color settings...');
					self.apply_color_settings(self.color_settings[new_color]);
				}
				console.log('Color change from ',self.old_color,' to ',new_color);
				self.old_color = new_color;
				self.old_material = self.selected_material();
			}else if(material_changed){
				//material settings übernommen und color überschrieben
				self.apply_material_settings(self.materials_settings[new_material]);
				console.log('Material change from ',self.old_material,' to ',new_material);
				self.old_material = new_material;
				self.color_settings[new_color] = self.get_current_settings(new_material);
				console.log('Color Settings Updated with new Material:',new_material);
			}
			console.log('OnChange: ', self.color_settings);
		});


		self.get_current_settings = function (material) {
			return {material : material,
					intensity : self.laserIntensity(),
					speed : self.laserSpeed(),
			}
		};

		self.update_colorSettings = function(){
			self.color_settings[self.selected_color()] = self.get_current_settings(self.selected_material())
		};

		self.apply_material_settings = function (settings){
			//[laserInt,speed,engraveWhite,engraveBlack,speedWhite,speedBlack]
			self.laserIntensity(settings[0]);
			self.laserSpeed(settings[1]);
			self.imgIntensityWhite(settings[2]);
			self.imgIntensityBlack(settings[3]);
			self.imgFeedrateWhite(settings[4]);
			self.imgFeedrateBlack(settings[5]);
		};

		self.apply_color_settings = function (s){
			//[laserInt,speed,engraveWhite,engraveBlack,speedWhite,speedBlack]
			self.selected_material(s.material);
			self.laserIntensity(s.intensity);
			self.laserSpeed(s.speed);
		};



		self.settingsString = ko.computed(function(){
			var intensity = self.laserIntensity();
			var feedrate = self.laserSpeed();
			var settingsString = "_i" + intensity + "s" + Math.round(feedrate);
			return settingsString;
		});

		self.slicer.subscribe(function(newValue) {
			self.profilesForSlicer(newValue);
		});

		self.enableConvertButton = ko.computed(function() {
			if (self.slicing_in_progress() || self.laserIntensity() === undefined || self.laserSpeed() === undefined || self.gcodeFilename() === undefined) {
				return false;
			} else {
				var tmpIntensity = self.laserIntensity();
				var tmpSpeed = self.laserSpeed();
				var tmpGcodeFilename = self.gcodeFilename().trim();
				return tmpGcodeFilename !== ""
					&& tmpIntensity > 0 && tmpIntensity <= 1000 // TODO no magic numbers here!
					&& tmpSpeed >= self.minSpeed() && tmpSpeed <= self.maxSpeed();
			}
		});

		self.requestData = function() {
			$.ajax({
				url: API_BASEURL + "slicing",
				type: "GET",
				dataType: "json",
				success: self.fromResponse
			});
		};

		self.fromResponse = function(data) {
			self.data = data;

			var selectedSlicer = undefined;
			self.slicers.removeAll();
			_.each(_.values(data), function(slicer) {
				var name = slicer.displayName;
				if (name === undefined) {
					name = slicer.key;
				}

				if (slicer.default) {
					selectedSlicer = slicer.key;
				}

				self.slicers.push({
					key: slicer.key,
					name: name
				});
			});

			if (selectedSlicer !== undefined) {
				self.slicer(selectedSlicer);
			}

			self.defaultSlicer = selectedSlicer;
		};

		self.profilesForSlicer = function(key) {
			if (key === undefined) {
				key = self.slicer();
			}
			if (key === undefined || !self.data.hasOwnProperty(key)) {
				return;
			}
			var slicer = self.data[key];

			var selectedProfile = undefined;
			self.profiles.removeAll();
			_.each(_.values(slicer.profiles), function(profile) {
				var name = profile.displayName;
				if (name === undefined) {
					name = profile.key;
				}

				if (profile.default) {
					selectedProfile = profile.key;
				}

				self.profiles.push({
					key: profile.key,
					name: name
				});
			});

			if (selectedProfile !== undefined) {
				self.profile(selectedProfile);
			}

			self.defaultProfile = selectedProfile;
		};

		self.convert = function() {
			if(self.gcodeFilesToAppend.length === 1 && self.svg === undefined){
				self.files.startGcodeWithSafetyWarning(self.gcodeFilesToAppend[0]);
			} else {
				self.update_colorSettings();
				self.slicing_in_progress(true);
				self.workingArea.getCompositionSVG(self.fill_areas(), self.cut_outlines(),self.color_settings,self.name_toHex, function(composition){
					self.svg = composition;
					var filename = self.gcodeFilename() + self.settingsString() + '.gco';
					var gcodeFilename = self._sanitize(filename);

					var data = {
						command: "convert",
						"profile.speed": self.laserSpeed(),
						"profile.intensity": self.laserIntensity(),
						"profile.fill_areas": self.fill_areas(),
						"profile.engrave": self.fill_areas(),
						"profile.set_passes": self.set_passes(),
						"profile.cut_outlines" : self.cut_outlines(),
						"profile.pierce_time": self.pierceTime(),
						"profile.intensity_black" : self.imgIntensityBlack(),
						"profile.intensity_white" : self.imgIntensityWhite(),
						"profile.feedrate_black" : self.imgFeedrateBlack(),
						"profile.feedrate_white" : self.imgFeedrateWhite(),
						"profile.img_contrast" : self.imgContrast(),
						"profile.img_sharpening" : self.imgSharpening(),
						"profile.img_dithering" : self.imgDithering(),
						"profile.beam_diameter" : self.beamDiameter(),
						slicer: "svgtogcode",
						gcode: gcodeFilename
					};

					for(var name in self.color_settings){
						if (name != undefined){
							var colHex = self.name_toHex[name];
							data['colors.'+ colHex +'.intensity'] = self.color_settings[name].intensity;
							data['colors.'+ colHex +'.speed'] = self.color_settings[name].speed;
							data['colors.'+ colHex +'.cut'] = name;
						}
					}

					console.log('after',data);

					if(self.svg !== undefined){
						data.svg = self.svg;
					} else {
						data.svg = '<svg height="0" version="1.1" width="0" xmlns="http://www.w3.org/2000/svg"><defs/></svg>';
					}
					if(self.gcodeFilesToAppend !== undefined){
						data.gcodeFilesToAppend = self.gcodeFilesToAppend;
					}

					$.ajax({
						url: "plugin/mrbeam/convert",
						type: "POST",
						dataType: "json",
						contentType: "application/json; charset=UTF-8",
						data: JSON.stringify(data)
					});

				});
			}
		};

		self._sanitize = function(name) {
			return name.replace(/[^a-zA-Z0-9\-_\.\(\) ]/g, "").replace(/ /g, "_");
		};

		self.onStartup = function() {
			self.requestData();
			self.state.conversion = self; // hack! injecting method to avoid circular dependency.
			self.files.conversion = self;
			self._configureIntensitySlider();
			self._configureFeedrateSlider();
			self._configureImgSliders();
		};
		
		self.onSlicingProgress = function(slicer, model_path, machinecode_path, progress){
			self.slicing_progress(progress);
		};
		self.onEventSlicingStarted = function(payload){
			self.slicing_in_progress(true);
		};
		self.onEventSlicingDone = function(payload){
			// payload
//			gcode: "ex_11more_i1000s300.gco"
//			gcode_location: "local"
//			stl: "local/ex_11more_i1000s300.svg"
//			time: 30.612739086151123
			self.gcodeFilename(undefined);
			self.svg = undefined;
			$("#dialog_vector_graphics_conversion").modal("hide");
			self.slicing_in_progress(false);
			//console.log("onSlicingDone" , payload);
		};
		self.onEventSlicingCancelled = function(payload){
			self.gcodeFilename(undefined);
			self.svg = undefined;
			self.slicing_in_progress(false);
			$("#dialog_vector_graphics_conversion").modal("hide");
			//console.log("onSlicingCancelled" , payload);
		};
		self.onEventSlicingFailed = function(payload){
			self.slicing_in_progress(false);
			//console.log("onSlicingFailed" , payload);
		};

		self._configureIntensitySlider = function() {
			self.intensitySlider = $("#svgtogcode_intensity_slider").slider({
				id: "svgtogcode_intensity_slider_impl",
				reversed: false,
				selection: "after",
				orientation: "horizontal",
				min: 1,
				max: 1000,
				step: 1,
				value: 500,
				enabled: true,
				formatter: function(value) { return "" + (value/10) +"%"; }
			}).on("slideStop", function(ev){
				self.laserIntensity(ev.value);
			});

			self.laserIntensity.subscribe(function(newVal){
				self.intensitySlider.slider('setValue', parseInt(newVal));
			});
		};

		self._configureFeedrateSlider = function() {
			self.feedrateSlider = $("#svgtogcode_feedrate_slider").slider({
				id: "svgtogcode_feedrate_slider_impl",
				reversed: false,
				selection: "after",
				orientation: "horizontal",
				min: 0,
				max: 100, // fixed values to avoid reinitializing after profile changes
				step: 1,
				value: 300,
				enabled: true,
				formatter: function(value) { return "" + Math.round(self._calcRealSpeed(value)) +"mm/min"; }
			});

			// use the class as a flag to avoid double binding of the slideStop event
			if($("#svgtogcode_feedrate_slider").attr('class') === 'uninitialized'){ // somehow hasClass(...) did not work ???
				self.feedrateSlider.on("slideStop", function(ev){
					$('#svgtogcode_feedrate').val(self._calcRealSpeed(ev.value));
					self.laserSpeed(self._calcRealSpeed(ev.value));
				});
				$("#svgtogcode_feedrate_slider").removeClass('uninitialized');
			}

			var speedSubscription = self.laserSpeed.subscribe(function(fromSettings){
				var realVal = parseInt(fromSettings);
				var val = 100*(realVal - self.minSpeed()) / (self.maxSpeed() - self.minSpeed());
				self.feedrateSlider.slider('setValue', val);
				//speedSubscription.dispose(); // only do it once
			});
		};

		self._calcRealSpeed = function(sliderVal){
			return Math.round(self.minSpeed() + sliderVal/100 * (self.maxSpeed() - self.minSpeed()));
		};
		
		self._configureImgSliders = function() {
			self.contrastSlider = $("#svgtogcode_contrast_slider").slider({
				step: .1,
				min: 1,
				max: self.contrastMax,
				value: 1,
				tooltip: 'hide'
			}).on("slide", function(ev){
				self.imgContrast(ev.value);
			});
			
			self.sharpeningSlider = $("#svgtogcode_sharpening_slider").slider({
				step: 1,
				min: 1,
				max: self.sharpeningMax,
				value: 1,
				class: 'img_slider',
				tooltip: 'hide'
			}).on("slide", function(ev){
				self.imgSharpening(ev.value);
			});

		};

		self.showExpertSettings.subscribe(function(){
			$('#dialog_vector_graphics_conversion').trigger('resize');
		});

	}
	
    ADDITIONAL_VIEWMODELS.push([VectorConversionViewModel, 
		["loginStateViewModel", "settingsViewModel", "printerStateViewModel", "workingAreaViewModel", "gcodeFilesViewModel"], 
		document.getElementById("dialog_vector_graphics_conversion")]);
	
});
