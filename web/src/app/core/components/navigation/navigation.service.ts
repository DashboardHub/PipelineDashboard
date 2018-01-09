import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FuseNavigationModelInterface } from './navigation.model';

@Injectable()
export class FuseNavigationService
{
    onNavCollapseToggle = new EventEmitter<any>();
    onNavCollapseToggled = new EventEmitter<any>();
    onNavigationModelChange: BehaviorSubject<any> = new BehaviorSubject({});
    navigationModel: FuseNavigationModelInterface;
    flatNavigation: any[] = [];

    constructor()
    {
    }

    /**
     * Get navigation model
     *
     * @returns {any[]}
     */
    getNavigationModel()
    {
        return this.navigationModel.model;
    }

    /**
     * Set the navigation model
     *
     * @param model
     */
    setNavigationModel(model)
    {
        this.navigationModel = model;
        this.onNavigationModelChange.next(this.navigationModel.model);
    }

    /**
     * Add new navigation item
     * to the given location
     */
    addNavigationItem(location, item)
    {
        // Parse the location
        const locationArr = location.split('.');

        if ( locationArr.length === 0 )
        {
            return;
        }

        // Find the navigation item
        const navItem = this.findNavigationItemById(locationArr);

        // Act according to the item type
        switch ( navItem.type )
        {
            case 'item':

                // Create a children array
                navItem.children = [];

                // Push the item
                navItem.children.push(item);

                // Change the item type to collapsable
                navItem.type = 'collapse';

                break;

            case 'collapse':

                // Push the item
                navItem.children.push(item);

                break;

            case 'group':

                // Push the item
                navItem.children.push(item);

                break;

            default:
                break;
        }
    }

    /**
     * Get navigation item from
     * given location
     *
     * @param location
     */
    getNavigationItem(location)
    {
        // Parse the location
        const locationArr = location.split('.');

        if ( locationArr.length === 0 )
        {
            return;
        }

        // Find and return the navigation item
        return this.findNavigationItemById(locationArr);
    }

    /**
     * Find navigation item by location
     *
     * @param location
     * @param navigation
     */
    findNavigationItemById(location, navigation?)
    {
        if ( !navigation )
        {
            navigation = this.navigationModel.model;
        }

        // Iterate through the given navigation
        for ( const navItem of navigation )
        {
            // If the nav item id equals the first location...
            if ( navItem.id === location[0] )
            {
                // If there is more location to look at...
                if ( location.length > 1 )
                {
                    // Remove the first item of the location
                    location.splice(0, 1);

                    // Go nested...
                    return this.findNavigationItemById(location, navItem.children);
                }

                // Otherwise just return the nav item
                else
                {
                    return navItem;
                }
            }
        }
    }

    /**
     * Get flattened navigation array
     * @param navigationItems
     * @returns {any[]}
     */
    getFlatNavigation(navigationItems?)
    {
        // If navigation items not provided,
        // that means we are running the function
        // for the first time...
        if ( !navigationItems )
        {
            // Reset the flat navigation
            this.flatNavigation = [];

            // Get the entire navigation model
            navigationItems = this.navigationModel.model;
        }

        for ( const navItem of navigationItems )
        {
            if ( navItem.type === 'subheader' )
            {
                continue;
            }

            if ( navItem.type === 'item' )
            {
                this.flatNavigation.push({
                    title: navItem.title,
                    type : navItem.type,
                    icon : navItem.icon || false,
                    url  : navItem.url
                });

                continue;
            }

            if ( navItem.type === 'collapse' || navItem.type === 'group' )
            {
                if ( navItem.children )
                {
                    this.getFlatNavigation(navItem.children);
                }
            }
        }

        return this.flatNavigation;
    }
}
