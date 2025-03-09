import { supabase } from "../config/supabaseClient.js";

export const getAllMovies = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('movie')
            .select('*');

        if (error) throw error;

        return res.status(200).json({
            message: 'Movies retrieved successfully',
            data: data
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getMovieById = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('movie')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) throw error;

        return res.status(200).json({
            message: 'Movie retrieved successfully',
            data: data
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const createMovie = async (req, res) => {
    try {
        const { movie_name, director_name, release_date } = req.body;
        const { data, error } = await supabase
            .from('movie')
            .insert([{ movie_name, director_name, release_date }])
            .select();

        if (error) throw error;

        return res.status(201).json({
            message: 'Movie created successfully',
            data: data
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const updateMovieById = async (req, res) => {
    try {
        const { movie_name, director_name, release_date } = req.body;

        if(!movie_name && !director_name && !release_date){
            return res.status(400).json({error: 'No fields to update'})
        }

        const { data, error } = await supabase
            .from('movie')
            .update({ movie_name, director_name, release_date })
            .eq('id', req.params.id)
            .select();

        if (error) throw error;

        return res.status(200).json({
            message: 'Movie updated successfully',
            data: data
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const deleteMovieById = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('movie')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;

        return res.status(200).json({
            message: 'Movie deleted successfully',
            data: data
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const searchMovies = async (req, res) => {
    try {
        const { value } = req.query;

        if (!value) {
            return res.status(400).json({ error: 'Search value is required' });
        }

        const { data, error } = await supabase
            .from('movie')
            .select('*')
            .ilike('movie_name', `%${value}%`);
            
        if (error) {
            throw error;
        }

        if (data.length === 0) {
            return res.status(404).json({ error: 'No movies found' });
        }

        return res.status(200).json({
            message: 'Movies fetched successfully',
            data: data
        });

    } catch (error) {

        return res.status(500).json({ error: error.message });
    }
}

export const filterMovies = async (req, res) => {
    try {
        let query = supabase
        .from('movie')
        .select('*');
        
        const { director, year} = req.query;

        if (director) {
            query = query.ilike('director_name', `%${director}%`);
        }

        if (year) {
            query = query.gte('release_date', `${year}-01-01`)
                        .lte('release_date', `${year}-12-31`);
        }

        const { data, error } = await query;

        if (error) throw error;

        return res.status(200).json({
            message: 'Movies filtered successfully',
            data: data
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getDirectorAnalytics = async (req, res) => {
    try {
        const { data, error } = await supabase.rpc('get_director_analytics');

        if (error) throw error;

        return res.status(200).json({
            message: 'Director analytics retrieved successfully',
            data: data
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}




